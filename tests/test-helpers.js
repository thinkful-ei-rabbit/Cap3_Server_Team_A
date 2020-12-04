const {
  TABLE_NAMES: {
    USERS,
    BUG,
    COMMENT_THREAD,
    STATUS,
    APP,
    SEVERITY_LEVEL,
    BUG_APP,
    BUG_SEVERITY,
  },
} = require('../src/constants/db.constants');

/*
|--------------------------------------------------------------------------
| Seed Data
|--------------------------------------------------------------------------
*/
// ! These are hard coded for custom SQL Triggers/Functions
const status_seed = [
  {
    id: 1,
    status_name: 'pending',
  },

  {
    id: 2,
    status_name: 'open',
  },

  {
    id: 3,
    status_name: 'closed',
  },

  {
    id: 4,
    status_name: 'dormant',
  },
];

const app_seed = [
  {
    id: 1,
    app_name: 'main-app',
  },

  {
    id: 2,
    app_name: 'second-app',
  },
];

const severity_level_seed = [
  {
    id: 1,
    level: 'low',
  },

  {
    id: 2,
    level: 'medium',
  },

  {
    id: 3,
    level: 'high',
  },

  {
    id: 4,
    level: 'pending',
  },
];

// ! These can be test-specific
const USER_PASSWORDS_JWT = {
  user_name1: {
    password: 'passPASS1!',
    authToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHlvb2hvby5jb20iLCJmaXJzdE5hbWUiOiJmaXJzdF9uYW1lMSIsImxhc3ROYW1lIjoibGFzdF9uYW1lMSIsImRldiI6dHJ1ZSwiaWF0IjoxNjA2OTI0NjI0LCJleHAiOjE2MDY5MjQ2MzQsInN1YiI6InVzZXJfbmFtZTEifQ.4U7VCqzA2ZmHzU5vNzYKEbluRV3InwGpWOCwNx_7EcY',
  },

  user_name2: {
    password: 'passPASS2!',
    authToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQHlvb2hvby5jb20iLCJmaXJzdE5hbWUiOiJmaXJzdF9uYW1lMiIsImxhc3ROYW1lIjoibGFzdF9uYW1lMiIsImRldiI6ZmFsc2UsImlhdCI6MTYwNjg1NjEwNSwiZXhwIjoxNjA2ODU2MjI1LCJzdWIiOiJ1c2VyX25hbWUyIn0.iLbRHfRwCH9EJXNtNjZSwQnkGTbC0CbcYelkuV76REI',
  },

  user_name3: {
    password: 'passPASS3!',
    authToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIzQHlvb2hvby5jb20iLCJmaXJzdE5hbWUiOiJmaXJzdF9uYW1lMyIsImxhc3ROYW1lIjoibGFzdF9uYW1lMyIsImRldiI6ZmFsc2UsImlhdCI6MTYwNjg1NjEzMCwiZXhwIjoxNjA2ODU2MjUwLCJzdWIiOiJ1c2VyX25hbWUzIn0.Zwe4Zt2Va4A0T2xwT09c8MpVpzHCndjiwEnaAhRiYtw',
  },
};

const users_seed = [
  {
    first_name: 'first_name1',
    last_name: 'last_name1',
    user_name: 'user_name1',
    password:
      '$2a$05$mOEj38JVBH8BWXLWGmz9duOIOLmGqHhM3TJF0yofJHf7I5cdGpvRu',
    email: 'user1@yoohoo.com',
    dev: true,
  },

  {
    first_name: 'first_name2',
    last_name: 'last_name2',
    user_name: 'user_name2',
    password:
      '$2a$05$29rSq0l1gb3jYePE9mt1R.gflKjO.srX/dCKRsWStd/ME8hk6nebi',
    email: 'user2@yoohoo.com',
    dev: false,
  },

  {
    first_name: 'first_name3',
    last_name: 'last_name3',
    user_name: 'user_name3',
    password:
      '$2a$05$373Ly2Bc0JO0tn.30HpUI.9uXRcKxJYn77/d66a3GmOIE6bPAE4ei',
    email: 'user3@yoohoo.com',
    dev: true,
  },
];

// ! export these!!!
const CREATED_AT_DATE = '2020-11-16 15:03:52.802713-07';
const UPDATED_AT_DATE = '2020-11-16 15:04:56.423753-07';
const COMPLETED_AT_DATE = '2020-11-16 15:05:28.457464-07';

const bug_seed = [
  {
    user_name: 'user_name1',
    bug_name: 'bug_name1',
    description: 'description1',
  },

  {
    user_name: 'user_name2',
    bug_name: 'bug_name2',
    description: 'description2',
  },

  {
    user_name: 'user_name3',
    bug_name: 'bug_name3',
    description: 'description3',
  },

  {
    user_name: 'user_name1',
    bug_name: 'bug_name4',
    description: 'description4',
    created_at: CREATED_AT_DATE,
    updated_at: UPDATED_AT_DATE,
    completed_at: COMPLETED_AT_DATE,
    completed_notes: 'bug 4 resolved',
  },
];

const comment_thread_seed = [
  {
    bug_id: 2,
    user_name: 'user_name2',
    comment: 'comment1',
  },

  {
    bug_id: 2,
    user_name: 'user_name2',
    comment: 'comment2',
  },

  {
    bug_id: 3,
    user_name: 'user_name3',
    comment: 'comment3',
  },

  {
    bug_id: 2,
    user_name: 'user_name1',
    comment: 'comment4',
  },
];

const bug_app_seed = [
  {
    bug_id: 1,
    app_id: 1,
  },

  {
    bug_id: 2,
    app_id: 1,
  },

  {
    bug_id: 3,
    app_id: 1,
  },

  {
    bug_id: 4,
    app_id: 1,
  },
];

const bug_severity_seed = [
  {
    bug_id: 1,
    severity_id: 1,
  },

  {
    bug_id: 2,
    severity_id: 2,
  },

  {
    bug_id: 3,
    severity_id: 3,
  },

  {
    bug_id: 4,
    severity_id: 3,
  },
];

/*
|--------------------------------------------------------------------------
| Safe Client-side submission data
|--------------------------------------------------------------------------
*/
const safeUser = {
  request: {
    first_name: 'safe first name',
    last_name: 'safe last name',
    user_name: 'safe user name',
    password: 'Safe-Pass123!',
    email: 'safeUser@yoohoo.com',
    dev: false,
  },

  result: {
    id: 4,
    first_name: 'safe first name',
    last_name: 'safe last name',
    user_name: 'safe user name',
    email: 'safeUser@yoohoo.com',
    dev: false,
  },
};

const safeBug = {
  request: {
    user_name: 'user_name1',
    bug_name: 'safe bug',
    description: 'safe description',
    app_name: 'second-app',
    level: 'high',
  },

  result: {
    id: 5,
    userName: 'user_name1',
    bugName: 'safe bug',
    description: 'safe description',
    completedDate: null,
    completedNotes: null,
    status: 'pending',
    app: 'second-app',
    severity: 'high',
  },
};

const invalidBug = {
  bug_id: 1,
  user_name: 'user_name1',
  bug_name: 'safe bug',
  description: 'safe description',
  app_name: 'second-app',
  level: 'high',
};

const safeCommentPost = {
  request: {
    bug_id: 1,
    user_name: 'user_name1',
    comment: 'safe comment',
  },

  result: {
    id: 5,
    bugName: 'bug_name1',
    userName: 'user_name1',
    comment: 'safe comment',
  },

  dbResult: {
    id: 5,
    bug_id: 1,
    user_name: 'user_name1',
    comment: 'safe comment',
  },
};

const safeCommentPatch = {
  request: {
    bug_id: 2,
    user_name: 'user_name1',
    comment: 'safe comment',
  },

  result: {
    id: 2,
    bugName: 'bug_name2',
    userName: 'user_name1',
    comment: 'safe comment',
  },

  dbResult: {
    id: 2,
    bug_id: 2,
    user_name: 'user_name1',
    comment: 'safe comment',
  },
};

const invalidComment = {
  bug_id: 5,
  user_name: 'user_name1',
  comment: 'safe comment',
};

/*
|--------------------------------------------------------------------------
| Malicious Client-side submission data
|--------------------------------------------------------------------------
*/
const maliciousUser = {
  request: {
    id: 4,
    first_name: '<script>naughty</script>',
    last_name: '<script>naughty</script>',
    user_name: '<script>naughty</script>',
    password: '<script>naughty</script>',
    email: '<script>naughty</script>',
    dev: true,
  },

  result: {
    // ! check if (id = 4) and (password = HASH HERE!!!)
    firstName: '&lt;script&gt;naughty&lt;/script&gt;',
    lastName: '&lt;script&gt;naughty&lt;/script&gt;',
    userName: '&lt;script&gt;naughty&lt;/script&gt;',
    email: '&lt;script&gt;naughty&lt;/script&gt;',
    dev: true,
  },
};

const maliciousBug = {
  request: {
    user_id: 1,
    bug_name: '<script>naughty</script>',
    description: '<script>naughty</script>',
    app: 'main-app',
    severity: 'low',
  },

  result: {
    id: 5,
    userName: 'user_name1',
    bugName: '&lt;script&gt;naughty&lt;/script&gt;',
    description: '&lt;script&gt;naughty&lt;/script&gt;',
    completedDate: null,
    completedNotes: null,
    status: 'pending',
    app: 'main-app',
    severity: 'low',
  },
};

const maliciousComment = {
  request: {
    bug_id: 1,
    user_id: 1,
    comment: '<script>naughty</script>',
  },

  result: {
    id: 4,
    bugName: 'user_name1',
    userName: 'bug_name1',
    comment: '&lt;script&gt;naughty&lt;/script&gt;',
  },
};

/*
|--------------------------------------------------------------------------
| Dev-Only Client-side submission data
|--------------------------------------------------------------------------
*/
const devBug1FullUpdate = {
  request: {
    user_name: 'user_name1',
    bug_name: 'updated bug name',
    description: 'updated bug description',
    completed_notes: null,
    status: 'open',
    app: 'main-app',
    severity: 'high',
  },

  result: {
    id: 1,
    bugPostedBy: 'user_name1',
    bugName: 'updated bug name',
    description: 'updated bug description',
    completedDate: null,
    completedNotes: null,
    status: 'open',
    app: 'main-app',
    severity: 'high',
  },
};

const devBug1InvalidUpdate = {
  user_name: 'user_name1',
  bug_name: 'updated bug name',
  description: 'updated bug description',
  completed_notes: 'invalid status',
  status: 'open',
  app: 'main-app',
  severity: 'high',
};

const devBug1UpdateBodies = {
  bugBody: {
    user_name: 'user_name1',
    bug_name: 'updated bug name',
    description: 'updated bug description',
    app: 'second-app',
    completed_notes: null,
  },

  linkageBody: {
    status: 'open',
    app: 'second-app',
    severity: 'high',
  },
};

/*
|--------------------------------------------------------------------------
| Expected Query Data
|--------------------------------------------------------------------------
*/
const GET_REQUESTS = {
  allUsers: [
    {
      id: 1,
      first_name: 'first_name1',
      last_name: 'last_name1',
      user_name: 'user_name1',
      password:
        '$2a$05$mOEj38JVBH8BWXLWGmz9duOIOLmGqHhM3TJF0yofJHf7I5cdGpvRu',
      email: 'user1@yoohoo.com',
      dev: true,
    },

    {
      id: 3,
      first_name: 'first_name3',
      last_name: 'last_name3',
      user_name: 'user_name3',
      password:
        '$2a$05$373Ly2Bc0JO0tn.30HpUI.9uXRcKxJYn77/d66a3GmOIE6bPAE4ei',
      email: 'user3@yoohoo.com',
      dev: true,
    },

    {
      id: 2,
      first_name: 'first_name2',
      last_name: 'last_name2',
      user_name: 'user_name2',
      password:
        '$2a$05$29rSq0l1gb3jYePE9mt1R.gflKjO.srX/dCKRsWStd/ME8hk6nebi',
      email: 'user2@yoohoo.com',
      dev: false,
    },
  ],

  userId1: {
    firstName: 'first_name1',
    lastName: 'last_name1',
    userName: 'user_name1',
    email: 'user1@yoohoo.com',
    dev: true,
  },

  // ! implement table joins
  bugId1: {
    id: 1,
    bugPostedBy: 'user_name1',
    bugName: 'bug_name1',
    description: 'description1',
    completedDate: null,
    completedNotes: null,
    status: 'pending',
    app: 'main-app',
    severity: 'low',
  },

  allBugs: [
    {
      id: 1,
      bugPostedBy: 'user_name1',
      bugName: 'bug_name1',
      description: 'description1',
      completedDate: null,
      completedNotes: null,
      status: 'pending',
      app: 'main-app',
      severity: 'low',
    },

    {
      id: 2,
      bugPostedBy: 'user_name2',
      bugName: 'bug_name2',
      description: 'description2',
      completedDate: null,
      completedNotes: null,
      status: 'open',
      app: 'main-app',
      severity: 'medium',
    },

    {
      id: 3,
      bugPostedBy: 'user_name3',
      bugName: 'bug_name3',
      description: 'description3',
      completedDate: null,
      completedNotes: null,
      status: 'open',
      app: 'main-app',
      severity: 'high',
    },

    {
      id: 4,
      bugPostedBy: 'user_name1',
      bugName: 'bug_name4',
      description: 'description4',
      createdDate: CREATED_AT_DATE,
      updatedDate: UPDATED_AT_DATE,
      completedDate: COMPLETED_AT_DATE,
      completedNotes: 'bug 4 resolved',
      status: 'closed',
      app: 'main-app',
      severity: 'high',
    },
  ],

  commentId2: {
    id: 2,
    bugName: 'bug_name2',
    userName: 'user_name2',
    comment: 'comment2',
  },

  latestCommentBug2: {
    id: 4,
    bugName: 'bug_name2',
    userName: 'user_name1',
    comment: 'comment4',
  },

  allCommentsBug2: [
    {
      id: 4,
      bugName: 'bug_name2',
      userName: 'user_name1',
      comment: 'comment4',
    },

    {
      id: 2,
      bugName: 'bug_name2',
      userName: 'user_name2',
      comment: 'comment2',
    },

    {
      id: 1,
      bugName: 'bug_name2',
      userName: 'user_name2',
      comment: 'comment1',
    },
  ],

  allCommentsUser1: [
    {
      id: 1,
      bugName: 'bug_name2',
      userName: 'user_name2',
      comment: 'comment1',
      createdDate: '',
    },

    {
      id: 2,
      bugName: 'bug_name2',
      userName: 'user_name2',
      comment: 'comment2',
      createdDate: '',
    },

    {
      id: 3,
      bugName: 'bug_name3',
      userName: 'user_name3',
      comment: 'comment3',
      createdDate: '',
    },

    {
      id: 4,
      bugName: 'bug_name2',
      userName: 'user_name1',
      comment: 'comment4',
      createdDate: '',
    },
  ],

  allCommentsUser2: [
    {
      id: 1,
      bugName: 'bug_name2',
      userName: 'user_name2',
      comment: 'comment1',
      createdDate: '',
    },
    {
      id: 2,
      bugName: 'bug_name2',
      userName: 'user_name2',
      comment: 'comment2',
      createdDate: '',
    },
  ],

  filters: {
    bug: {
      dev: [
        {
          id: 3,
          bugName: 'bug_name3',
          userName: 'user_name3',
          comment: 'comment3',
        },
      ],

      nonDev: [
        {
          id: 1,
          bugName: 'bug_name2',
          userName: 'user_name2',
          comment: 'comment1',
        },
        {
          id: 2,
          bugName: 'bug_name2',
          userName: 'user_name2',
          comment: 'comment2',
        },
      ],
    },

    user: {
      dev: [
        {
          id: 3,
          bugName: 'bug_name3',
          userName: 'user_name3',
          comment: 'comment3',
        },
      ],

      nonDev: [
        {
          id: 1,
          bugName: 'bug_name2',
          userName: 'user_name2',
          comment: 'comment1',
        },
      ],
    },

    none: 'No comments found for ',
  },

  allApps: [
    { id: 1, rawName: 'main-app', formatName: 'Main App' },
    {
      id: 2,
      rawName: 'second-app',
      formatName: 'Second App',
    },
  ],

  sorts: {
    status: {
      dev: {
        bugsPending: [
          {
            id: 4,
            bugPostedBy: 'user_name1',
            bugName: 'bug_name4',
            description: 'description4',
            createdDate: '2020-11-16T22:03:52.802Z',
            updatedDate: '2020-11-16T22:04:56.423Z',
            completedDate: '2020-11-16T22:05:28.457Z',
            completedNotes: 'bug 4 resolved',
            status: 'pending',
            app: 'main-app',
            severity: 'high',
          },
          {
            id: 1,
            bugPostedBy: 'user_name1',
            bugName: 'bug_name1',
            description: 'description1',
            createdDate: '2020-12-03T23:26:55.247Z',
            updatedDate: '2020-12-03T23:26:55.247Z',
            completedDate: null,
            completedNotes: null,
            status: 'pending',
            app: 'main-app',
            severity: 'low',
          },
        ],
        bugsOpen: [
          {
            id: 3,
            bugPostedBy: 'user_name3',
            bugName: 'bug_name3',
            description: 'description3',
            createdDate: '2020-12-03T23:26:55.247Z',
            updatedDate: '2020-12-03T23:26:55.280Z',
            completedDate: null,
            completedNotes: null,
            status: 'open',
            app: 'main-app',
            severity: 'high',
          },
          {
            id: 2,
            bugPostedBy: 'user_name2',
            bugName: 'bug_name2',
            description: 'description2',
            createdDate: '2020-12-03T23:26:55.247Z',
            updatedDate: '2020-12-03T23:26:55.280Z',
            completedDate: null,
            completedNotes: null,
            status: 'open',
            app: 'main-app',
            severity: 'medium',
          },
        ],
        bugsClosed: [],
        bugsDormant: [],
      },

      nonDev: {
        bugsPending: [],
        bugsOpen: [
          {
            id: 2,
            bugPostedBy: 'user_name2',
            bugName: 'bug_name2',
            description: 'description2',
            createdDate: '2020-12-03T23:26:53.905Z',
            updatedDate: '2020-12-03T23:26:53.930Z',
            completedDate: null,
            completedNotes: null,
            status: 'open',
            app: 'main-app',
            severity: 'medium',
          },
        ],
        bugsClosed: [],
        bugsDormant: [],
      },
    },

    app: {
      dev: {},

      nonDev: {},
    },

    severity: {
      dev: {},

      nonDev: {},
    },
  },
};

const DELETE_REQUESTS = {
  userId1: {
    firstName: 'first_name1',
    lastName: 'last_name1',
    userName: 'user_name1',
    email: 'user1@yoohoo.com',
    dev: true,
  },

  bugId1: {
    id: 1,
    bugPostedBy: 'user_name1',
    bugName: 'bug_name1',
    description: 'description1',
    completedDate: null,
    completedNotes: null,
    status: 'pending',
    app: 'main-app',
    severity: 'low',
  },

  commentId2: {
    id: 2,
    bugName: 'bug_name2',
    userName: 'user_name2',
    comment: 'comment2',
  },
};

const JOIN_QUERIES = {};

const UNIQUE_QUERIES = {};

/*
|--------------------------------------------------------------------------
| Helper functions
|--------------------------------------------------------------------------
*/
const getUserPassword = (userName) =>
  USER_PASSWORDS_JWT[userName].password;

const getAuthHeaders = async (app, user_name) => {
  const { password } = USER_PASSWORDS_JWT[user_name];
  const { body } = await supertest(app)
    .post('/api/users/login')
    .send({ user_name, password });

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${body.authToken}`,
  };
};

const invalidHeader = {
  'Content-Type': 'application/json',
  Authorization: `Bearer invalidToken`,
};

const getSeedData = () => ({
  status_seed,
  app_seed,
  severity_level_seed,
  users_seed,
  bug_seed,
  comment_thread_seed,
  bug_app_seed,
  bug_severity_seed,
});

const getClientSubmissions = () => ({
  safeUser,
  safeBug,
  invalidBug,
  safeCommentPost,
  safeCommentPatch,
  invalidComment,
});

const getMaliciousSubmissions = () => ({
  maliciousUser,
  maliciousBug,
  maliciousComment,
});

const getDevOnlySubmissions = () => ({
  devBug1FullUpdate,
  devBug1InvalidUpdate,
  devBug1UpdateBodies,
});

const getExpectedQueryData = () => ({
  GET_REQUESTS,
  DELETE_REQUESTS,
  JOIN_QUERIES,
  UNIQUE_QUERIES,
});

const cleanTables = (db) => {
  return db.raw(
    `TRUNCATE users, status, app, severity_level RESTART IDENTITY CASCADE;`,
  );
};

const cleanBugs = (db) => {
  return db.raw(`TRUNCATE bug RESTART IDENTITY CASCADE;`);
};

const cleanComments = (db) => {
  return db.raw(`TRUNCATE comment_thread RESTART IDENTITY CASCADE;`);
};

const seedTable = (db, table, data) => db(table).insert(data);

const seedUsers = (db) => db(USERS).insert(users_seed);

const seedAllTables = async (db) => {
  await db(STATUS).insert(status_seed);
  await db(APP).insert(app_seed);
  await db(SEVERITY_LEVEL).insert(severity_level_seed);
  await db(USERS).insert(users_seed);
  await db(BUG).insert(bug_seed);
  await db(COMMENT_THREAD).insert(comment_thread_seed);
  await db(BUG_APP).insert(bug_app_seed);
  await db(BUG_SEVERITY).insert(bug_severity_seed);
};

const getFromDB = {
  user(db, id) {},

  bug(db, id) {},

  async comment(db, id) {
    const comm = await db('comment_thread').where({ id }).first();
    return comm || null;
  },

  links(db, bug_id) {},
};

module.exports = {
  CREATED_AT_DATE,
  UPDATED_AT_DATE,
  COMPLETED_AT_DATE,

  getUserPassword,
  getAuthHeaders,
  invalidHeader,
  getSeedData,
  getClientSubmissions,
  getMaliciousSubmissions,
  getDevOnlySubmissions,
  getExpectedQueryData,

  cleanTables,
  cleanBugs,
  cleanComments,

  seedTable,
  seedUsers,
  seedAllTables,
  getFromDB,
};
