const {
  CRUDService,
  SerializeService,
} = require('../../src/services');

const { TABLE_NAMES } = require('../../src/constants/db.constants');
const {
  auth,
  validate,
  Router,
  jsonBodyParser,
} = require('../../src/middlewares');

const usersRouter = Router();
const TABLE_NAME = TABLE_NAMES.USERS;

module.exports = usersRouter;
