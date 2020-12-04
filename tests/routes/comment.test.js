const app = require('../../src/app');
const helpers = require('../test-helpers');
const { ROUTES } = require('../../src/constants/endpoints.constants');

describe.only('Route: Comment-Thread router', () => {
  const COMMENTS_EP = ROUTES.API + ROUTES.COMMENT_THREAD;
  const testDev = helpers.getSeedData().users_seed[0];
  const testUser = helpers.getSeedData().users_seed[1];
  const subs = helpers.getClientSubmissions();
  const queries = helpers.getExpectedQueryData();
  const { filters } = queries.GET_REQUESTS;

  let db;
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DB_URL,
    });
    app.set('db', db);
  });

  afterEach('cleanup', () => helpers.cleanTables(db));

  after('disconnect from db', () => db.destroy());

  const authHeaders = { dev: {}, nonDev: {} };
  beforeEach('seed all tables and set auth headers', async () => {
    await helpers.seedAllTables(db);

    authHeaders.dev = await helpers.getAuthHeaders(
      app,
      testDev.user_name,
      db,
    );
    authHeaders.nonDev = await helpers.getAuthHeaders(
      app,
      testUser.user_name,
      db,
    );
  });

  const bodyErrorTest = (endpoint, method) => {
    it('throws error if missing body fields', () => {
      return supertest(app)
        [method](endpoint)
        .set(authHeaders.dev)
        .expect(400)
        .then((res) => {
          expect(res.body).to.deep.equal({
            error: "Missing 'bug_id' in request body",
          });
        });
    });
  };

  it('rejects unauthorized user', () => {
    return supertest(app).get(COMMENTS_EP).expect(401);
  });

  describe(`ENDPOINT: '/comments'`, () => {
    context('GET', () => {
      [true, false].forEach((devStatus) => {
        const reqs = queries.GET_REQUESTS;
        const text = devStatus ? 'a dev' : 'not a dev';

        it(`all comments when user is ${text}`, () => {
          const headers = devStatus
            ? authHeaders.dev
            : authHeaders.nonDev;

          return supertest(app)
            .get(COMMENTS_EP)
            .set(headers)
            .expect(200)
            .expect((res) => {
              const expectedComments = devStatus
                ? reqs.allCommentsUser1
                : reqs.allCommentsUser2;
              const { comments } = res.body;

              expectedComments.forEach((expCom, idx) => {
                const keys = Object.keys(expCom);
                keys.forEach((key) => {
                  if (key === 'createdDate') {
                    expect(comments[idx][key]).to.be.a('string');
                  } else
                    expect(comments[idx][key]).to.eql(expCom[key]);
                });
              });
            });
        });
      });
    });

    context('POST', () => {
      bodyErrorTest(COMMENTS_EP, 'post');

      it('throws error if bug_id is invalid', () => {
        return supertest(app)
          .post(COMMENTS_EP)
          .set(authHeaders.nonDev)
          .send(subs.invalidComment)
          .expect(401)
          .then((res) => {
            const { error } = res.body;
            expect(error).to.eql(
              'Bug not found/unauthorized comment query',
            );
          });
      });

      const { request, result, dbResult } = subs.safeCommentPost;

      it('throws error if not a dev or correct user', () => {
        return supertest(app)
          .post(COMMENTS_EP)
          .set(authHeaders.nonDev)
          .send(request)
          .expect(401)
          .expect((res) => {
            const { error } = res.body;
            expect(error).to.eql(
              'Bug not found/unauthorized comment query',
            );
          });
      });

      it('creates and returns a new formatted comment', () => {
        return supertest(app)
          .post(COMMENTS_EP)
          .set(authHeaders.dev)
          .send(request)
          .expect(200)
          .then((res) => {
            const { newComment } = res.body;
            const { createdDate } = newComment;
            result.createdDate = createdDate;
            expect(createdDate).to.be.a('string');
            expect(newComment).to.eql(result);

            return helpers.getFromDB.comment(db, newComment.id);
          })
          .then((res) => {
            dbResult.created_at = res.created_at;
            expect(res.created_at).to.be.a('date');
            expect(res).to.eql(dbResult);
          });
      });
    });
  });

  describe(`ENDPOINT: '/comments/:commId'`, () => {
    const COMMENTS_ID_EP = `${COMMENTS_EP}/2`;

    it('throws error if commId is invalid', () => {
      return supertest(app)
        .get(`/api/comments/5`)
        .set(authHeaders.nonDev)
        .expect(401)
        .then((res) => {
          const { error } = res.body;
          expect(error).to.eql(
            'Comment not found/unauthorized comment query',
          );
        });
    });

    it('throws error if not a dev or correct user', () => {
      return supertest(app)
        .get('/api/comments/3')
        .set(authHeaders.nonDev)
        .expect(401)
        .expect((res) => {
          const { error } = res.body;
          expect(error).to.eql(
            'Comment not found/unauthorized comment query',
          );
        });
    });

    context('GET', () => {
      it('formatted comment by id', () => {
        return supertest(app)
          .get(COMMENTS_ID_EP)
          .set(authHeaders.dev)
          .expect(200)
          .expect((res) => {
            const { commentId2 } = queries.GET_REQUESTS;
            const { createdDate } = res.body;
            commentId2.createdDate = createdDate;
            expect(createdDate).to.be.a('string');
            expect(res.body).to.eql(commentId2);
          });
      });
    });

    context('PATCH', () => {
      bodyErrorTest(COMMENTS_ID_EP, 'patch');

      it('successfully updates and returns formatted comment', () => {
        const { request, result, dbResult } = subs.safeCommentPatch;

        return supertest(app)
          .patch(COMMENTS_ID_EP)
          .set(authHeaders.dev)
          .send(request)
          .expect(200)
          .then((res) => {
            const { updComment } = res.body;
            result.createdDate = updComment.createdDate;
            expect(updComment.createdDate).to.be.a('string');
            expect(updComment).to.eql(result);

            return helpers.getFromDB.comment(db, result.id);
          })
          .then((res) => {
            dbResult.created_at = res.created_at;
            expect(res.created_at).to.be.a('date');
            expect(res).to.eql(dbResult);
          });
      });
    });

    context('DELETE', () => {
      it('successfully deletes and returns formatted comment', () => {
        return supertest(app)
          .delete(COMMENTS_ID_EP)
          .set(authHeaders.dev)
          .expect(200)
          .then((res) => {
            const { commentId2 } = queries.DELETE_REQUESTS;
            const { delComment } = res.body;
            commentId2.createdDate = delComment.createdDate;
            expect(delComment.createdDate).to.be.a('string');
            expect(delComment).to.eql(commentId2);

            return helpers.getFromDB.comment(db, commentId2.id);
          })
          .then((res) => {
            expect(res).to.eql(null);
          });
      });
    });
  });

  const nonDevRoutes = {
    bug: '/bug/2',
    user: '/user/user_name2',
  };
  const filterRoutes = {
    bug: '/bug/3',
    user: '/user/user_name3',
  };
  const filterTypes = Object.keys(filterRoutes);

  filterTypes.forEach((type) => {
    context(`ENDPOINT: GET '/comments${filterRoutes[type]}'`, () => {
      const nonDevResults = filters[type].nonDev;
      const devResults = filters[type].dev;
      const tests = [nonDevResults, devResults];

      tests.forEach((expected, isDev) => {
        const ENDPOINT = COMMENTS_EP + filterRoutes[type];
        const NON_DEV_ENDPOINT = COMMENTS_EP + nonDevRoutes[type];
        const text = isDev ? 'dev' : 'non-dev';

        // ? only run once per route
        if (!isDev) {
          it('returns error if missing token', () => {
            return supertest(app)
              .get(ENDPOINT)
              .expect(401)
              .then((res) => {
                const { error } = res.body;
                expect(error).to.eql('Missing bearer token');
              });
          });

          it('returns error for unauthorized user', () => {
            return supertest(app)
              .get(ENDPOINT)
              .set(authHeaders.nonDev)
              .expect(401)
              .then((res) => {
                const { error } = res.body;
                expect(error).to.eql('Unauthorized comment query');
              });
          });
        }

        it(`returns sorted arrays for a ${text}`, () => {
          const TEST_ENDPOINT = isDev ? ENDPOINT : NON_DEV_ENDPOINT;
          const headers = isDev ? authHeaders.dev : authHeaders.nonDev;

          return supertest(app)
            .get(TEST_ENDPOINT)
            .set(headers)
            .expect(200)
            .then((res) => {
              const { bugComments, userComments } = res.body;
              const result = bugComments || userComments;

              expected.forEach((comm, idx) => {
                const resComm = result[idx];
                const { createdDate } = resComm;
                const expComm = { ...comm, createdDate };

                expect(createdDate).to.be.a('string');
                expect(resComm).to.eql(expComm);
              });
            });
        });

        if (isDev) {
          it('returns a message if there are no comments', async () => {
            await helpers.cleanComments(db);

            return supertest(app)
              .get(ENDPOINT)
              .set(authHeaders.dev)
              .expect(200)
              .then((res) => {
                const { bugComments, userComments } = res.body;
                const result = bugComments || userComments;
                expect(result).to.be.an('array');
                expect(result[0]).to.be.an('object');
                expect(result[0].message).to.include(filters.none);
              });
          });
        }
      });
    });
  });
});
