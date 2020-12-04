-- trigger function for setting pending status
CREATE OR REPLACE FUNCTION trigger_bug_pending()
RETURNS TRIGGER AS $bug_pending$
  BEGIN
    -- update timestamp by id
    INSERT INTO bug_status (bug_id, status_id)
    VALUES (NEW.id, 1);
    RETURN NULL;
  END;
$bug_pending$ LANGUAGE plpgsql;

-- this will auto stamp updated_at on every comment update
CREATE TRIGGER bug_pending
AFTER INSERT ON bug
FOR EACH ROW EXECUTE FUNCTION trigger_bug_pending();

-- trigger function for updating the updated_at column in bug table
CREATE OR REPLACE FUNCTION trigger_bug_updated_at()
RETURNS TRIGGER AS $bug_updated_at$
  DECLARE
    current_status INTEGER;
    tr_bug_id INTEGER;

  BEGIN
    -- case for delete (OLD variable)
    SELECT COALESCE(NEW.bug_id, OLD.bug_id)
    INTO tr_bug_id;

    -- basic checks
    IF tr_bug_id IS NULL THEN
      RAISE EXCEPTION 'bug_id cannot be null';
    END IF;

    IF COALESCE(NEW.user_name, OLD.user_name) IS NULL THEN
      RAISE EXCEPTION 'user_name cannot be null';
    END IF;

    IF COALESCE(NEW.comment, OLD.comment) IS NULL THEN
      RAISE EXCEPTION 'comment cannot be null';
    END IF;

    -- update timestamp by id
    UPDATE bug SET updated_at = NOW()
    WHERE id = tr_bug_id;
    RETURN NULL;
  END;
$bug_updated_at$ LANGUAGE plpgsql;

-- this will auto stamp updated_at on every comment update
CREATE TRIGGER bug_updated_at
AFTER INSERT OR UPDATE OR DELETE ON comment_thread
FOR EACH ROW EXECUTE FUNCTION trigger_bug_updated_at();

-- trigger function for updating the updated_at column in bug table when updated
CREATE OR REPLACE FUNCTION trigger_bug_update_at()
RETURNS TRIGGER AS $bug_update_at$
  BEGIN
    -- update timestamp by id
    UPDATE bug SET updated_at = NOW()
    WHERE id = NEW.bug_id;
    RETURN NULL;
  END;
$bug_update_at$ LANGUAGE plpgsql;

-- this will auto stamp updated_at on every bug update
CREATE TRIGGER bug_update_at
AFTER UPDATE ON bug_severity_level
FOR EACH ROW EXECUTE FUNCTION trigger_bug_update_at();

-- trigger function for updating status on bug linkage table
CREATE OR REPLACE FUNCTION trigger_bug_status()
RETURNS TRIGGER AS $bug_status$
  DECLARE
    current_status INTEGER;
    tr_bug_id INTEGER;

  BEGIN
    -- case for delete (OLD variable)
    SELECT COALESCE(NEW.bug_id, OLD.bug_id)
    INTO tr_bug_id;

    -- grab current status
    SELECT status_id INTO current_status
    FROM bug_status WHERE bug_id = tr_bug_id;

    -- check if bug is already open or closed
    IF current_status = 2 THEN
      RETURN NULL;
    ELSEIF current_status = 3 THEN
      RAISE EXCEPTION 'bug is closed';
    END IF;

    -- update status by id to 'open'
    UPDATE bug_status SET status_id = 2
    WHERE bug_id = tr_bug_id;
    RETURN NULL;
  END;
$bug_status$ LANGUAGE plpgsql;

-- this will auto update status if needed on comment update
CREATE TRIGGER bug_status
AFTER INSERT OR UPDATE OR DELETE ON comment_thread
FOR EACH ROW EXECUTE FUNCTION trigger_bug_status();
