const { TABLE_NAMES } = require('../constants/db.constants');
const { CRUDService, SerializeService } = require('../services');
const {
  auth,
  validate,
  Router,
  jsonBodyParser,
} = require('../middlewares');

const commentRouter = Router();
const TABLE_NAME = TABLE_NAMES.COMMENT_THREAD;

async function _bugName(db, bug_id, dev, user_name) {
  const bug = await CRUDService.getBySearch(
    db,
    TABLE_NAMES.BUG,
    'id',
    bug_id,
  );

  if (dev || (bug && bug.user_name === user_name)) {
    return bug.bug_name;
  }

  return null;
}

commentRouter.use(auth.requireAuth);

commentRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const { dev, user_name } = req.dbUser;

      const rawComments = dev
        ? await CRUDService.getAllByOrder(
            req.app.get('db'),
            TABLE_NAME,
            'created_at',
          )
        : await CRUDService.getAllBySearchOrder(
            req.app.get('db'),
            TABLE_NAME,
            'user_name',
            user_name,
            'created_at',
          );

      for (let i = 0; i < rawComments.length; i++) {
        const { bug_id } = rawComments[i];
        rawComments[i].bug_name = await _bugName(
          req.app.get('db'),
          bug_id,
          dev,
          user_name,
        );
      }

      const comments = SerializeService.formatAll(
        rawComments,
        TABLE_NAME,
      );

      res.status(200).json({ comments });
    } catch (error) {
      next(error);
    }
  })
  .post(
    jsonBodyParser,
    validate.commentBody,
    async (req, res, next) => {
      try {
        const { dev, user_name } = req.dbUser;

        const bug_name = await _bugName(
          req.app.get('db'),
          req.newComment.bug_id,
          dev,
          user_name,
        );

        if (!bug_name) {
          res.status(401).json({
            error: 'Bug not found/unauthorized comment query',
          });
          return;
        }

        const [rawComment] = await CRUDService.createEntry(
          req.app.get('db'),
          TABLE_NAME,
          req.newComment,
        );

        rawComment.bug_name = bug_name;

        const newComment = SerializeService.formatComment(rawComment);

        res.status(200).json({ newComment });
      } catch (error) {
        next(error);
      }
    },
  );

commentRouter
  .route('/:id')
  .all(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { dev, user_name } = req.dbUser;

      const comment = await CRUDService.getBySearch(
        req.app.get('db'),
        TABLE_NAME,
        'id',
        id,
      );

      if (!comment || (!dev && comment.user_name !== user_name)) {
        res.status(401).json({
          error: 'Comment not found/unauthorized comment query',
        });
        return;
      }

      const bug_name = await _bugName(
        req.app.get('db'),
        comment.bug_id,
        dev,
        user_name,
      );

      comment.bug_name = bug_name;

      req.comment = comment;
      next();
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    try {
      const comment = SerializeService.formatComment(req.comment);
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  })
  .patch(
    jsonBodyParser,
    validate.commentBody,
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const { bug_id } = req.newComment;

        if (+req.comment.bug_id !== +bug_id) {
          res.status(401).json({
            error: 'Bug ID conflict in body',
          });
          return;
        }

        const [rawComment] = await CRUDService.updateEntry(
          req.app.get('db'),
          TABLE_NAME,
          'id',
          id,
          req.newComment,
        );

        rawComment.bug_name = req.comment.bug_name;

        const updComment = SerializeService.formatComment(rawComment);

        res.status(200).json({ updComment });
      } catch (error) {
        next(error);
      }
    },
  )
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;

      const [rawComment] = await CRUDService.deleteEntry(
        req.app.get('db'),
        TABLE_NAME,
        'id',
        id,
      );

      rawComment.bug_name = req.comment.bug_name;

      const delComment = SerializeService.formatComment(rawComment);

      res.status(200).json({ delComment });
    } catch (error) {
      next(error);
    }
  });

commentRouter.route('/bug/:bugId').get(async (req, res, next) => {
  try {
    const { bugId } = req.params;
    const { dev, user_name } = req.dbUser;

    const bug_name = await _bugName(
      req.app.get('db'),
      bugId,
      dev,
      user_name,
    );

    if (!bug_name) {
      res.status(401).json({ error: 'Unauthorized comment query' });
      return;
    }

    const rawComments = await CRUDService.getAllBySearchOrder(
      req.app.get('db'),
      TABLE_NAME,
      'bug_id',
      bugId,
      'created_at',
    );

    for (let i = 0; i < rawComments.length; i++) {
      rawComments[i].bug_name = bug_name;
    }

    const bugComments = rawComments.length
      ? SerializeService.formatAll(rawComments, TABLE_NAME)
      : [{ message: `No comments found for bug: ${bug_name}` }];

    res.status(200).json({ bugComments });
  } catch (error) {
    next(error);
  }
});

commentRouter.route('/user/:userName').get(async (req, res, next) => {
  try {
    const { userName } = req.params;
    const { dev, user_name } = req.dbUser;

    if (!dev && userName !== user_name) {
      res.status(401).json({
        error: 'Unauthorized comment query',
      });
      return;
    }

    const rawComments = await CRUDService.getAllBySearchOrder(
      req.app.get('db'),
      TABLE_NAME,
      'user_name',
      userName,
      'created_at',
    );

    for (let i = 0; i < rawComments.length; i++) {
      const { bug_id } = rawComments[i];
      rawComments[i].bug_name = await _bugName(
        req.app.get('db'),
        bug_id,
        dev,
        user_name,
      );
    }

    const userComments = rawComments.length
      ? SerializeService.formatAll(rawComments, TABLE_NAME)
      : [{ message: `No comments found for user: '${user_name}'` }];

    res.status(200).json({ userComments });
  } catch (error) {
    next(error);
  }
});

module.exports = commentRouter;
