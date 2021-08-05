const graphql = require('graphql');
const pool = require('../db/codekipper/sql_pool.js');

const { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString, 
  GraphQLInt, 
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = graphql;
  
const SnippetsType = new GraphQLObjectType({
  name: 'Snippets',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: GraphQLID },
    relatedUser: {
      type: UserType,
      resolve(parent, args) {
        const sql = `SELECT * FROM "User" WHERE "id" = '${parent.user_id}';`
        return pool.query(sql)
          .then(res => res.rows[0])
          .catch(err => console.log('Error: ', err))
      }
    },
    folder_id: { type: GraphQLID },
    relatedFolder: {
      type: FolderType,
      resolve(parent, args) {
        const sql = `SELECT * FROM "Folder" WHERE "id" = '${parent.folder_id}';`
        return pool.query(sql)
          .then(res => res.rows[0])
          .catch(err => console.log('Error: ', err))
      }
    }
  })
});

const FolderType = new GraphQLObjectType({
  name: 'Folder',
  fields: () => ({
    id: { type: GraphQLID },
    everyRelatedSnippets: {
      type: new GraphQLList(SnippetsType),
      resolve(parent, args) {
        const sql = `SELECT * FROM "Snippets" WHERE "folder_id" = '${parent.id}';`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    name: { type: GraphQLString },
    user_id: { type: GraphQLID },
    relatedUser: {
      type: UserType,
      resolve(parent, args) {
        const sql = `SELECT * FROM "User" WHERE "id" = '${parent.user_id}';`
        return pool.query(sql)
          .then(res => res.rows[0])
          .catch(err => console.log('Error: ', err))
      }
    },
    language_id: { type: GraphQLInt },
    relatedLanguages: {
      type: LanguagesType,
      resolve(parent, args) {
        const sql = `SELECT * FROM "Languages" WHERE "id" = '${parent.language_id}';`
        return pool.query(sql)
          .then(res => res.rows[0])
          .catch(err => console.log('Error: ', err))
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    everyRelatedFolder: {
      type: new GraphQLList(FolderType),
      resolve(parent, args) {
        const sql = `SELECT * FROM "Folder" WHERE "user_id" = '${parent.id}';`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    everyRelatedSnippets: {
      type: new GraphQLList(SnippetsType),
      resolve(parent, args) {
        const sql = `SELECT * FROM "Snippets" WHERE "user_id" = '${parent.id}';`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    user_name: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const LanguagesType = new GraphQLObjectType({
  name: 'Languages',
  fields: () => ({
    id: { type: GraphQLID },
    everyRelatedFolder: {
      type: new GraphQLList(FolderType),
      resolve(parent, args) {
        const sql = `SELECT * FROM "Folder" WHERE "language_id" = '${parent.id}';`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    name: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    everySnippets: {
      type: new GraphQLList(SnippetsType),
      resolve() {
        const sql = `SELECT * FROM "Snippets";`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    snippets: {
      type: SnippetsType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        const sql = `SELECT * FROM "Snippets" WHERE id = '${args.id}';`;
        return pool.query(sql)
          .then(res => res.rows[0])
          .catch(err => console.log('Error: ', err))
      }
    },
    everyFolder: {
      type: new GraphQLList(FolderType),
      resolve() {
        const sql = `SELECT * FROM "Folder";`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    folder: {
      type: FolderType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        const sql = `SELECT * FROM "Folder" WHERE id = '${args.id}';`;
        return pool.query(sql)
          .then(res => res.rows[0])
          .catch(err => console.log('Error: ', err))
      }
    },
    everyUser: {
      type: new GraphQLList(UserType),
      resolve() {
        const sql = `SELECT * FROM "User";`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        const sql = `SELECT * FROM "User" WHERE id = '${args.id}';`;
        return pool.query(sql)
          .then(res => res.rows[0])
          .catch(err => console.log('Error: ', err))
      }
    },
    everyLanguages: {
      type: new GraphQLList(LanguagesType),
      resolve() {
        const sql = `SELECT * FROM "Languages";`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    languages: {
      type: LanguagesType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        const sql = `SELECT * FROM "Languages" WHERE id = '${args.id}';`;
        return pool.query(sql)
          .then(res => res.rows[0])
          .catch(err => console.log('Error: ', err))
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSnippets: {
      type: SnippetsType,
      args: {
      //  id: { type: GraphQLID },
        code: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLID },
        folder_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        const columns = Object.keys(args).map(el => `"${el}"`);
        const values = Object.values(args).map(el => `'${el}'`);
        const sql = `INSERT INTO "Snippets" (${columns}) VALUES (${values}) RETURNING *`;
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    updateSnippets: {
      type: SnippetsType,
      args: {
        id: { type: GraphQLID },
        code: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLID },
        folder_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        let updateValues = '';
        for (const prop in args) {
          if (updateValues.length > 0) updateValues += `, `;
          updateValues += `"${prop}" = '${args[prop]}' `;
        }
        const sql = `UPDATE "Snippets" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    deleteSnippets: {
      type: SnippetsType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        const sql = `DELETE FROM "Snippets" WHERE id = '${args.id}' RETURNING *;`
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    addFolder: {
      type: FolderType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        user_id: { type: GraphQLID },
        language_id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const columns = Object.keys(args).map(el => `"${el}"`);
        const values = Object.values(args).map(el => `'${el}'`);
        const sql = `INSERT INTO "Folder" (${columns}) VALUES (${values}) RETURNING *`;
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    updateFolder: {
      type: FolderType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        user_id: { type: GraphQLID },
        language_id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let updateValues = '';
        for (const prop in args) {
          if (updateValues.length > 0) updateValues += `, `;
          updateValues += `"${prop}" = '${args[prop]}' `;
        }
        const sql = `UPDATE "Folder" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    deleteFolder: {
      type: FolderType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        const sql = `DELETE FROM "Folder" WHERE id = '${args.id}' RETURNING *;`
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    addUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        user_name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        const columns = Object.keys(args).map(el => `"${el}"`);
        const values = Object.values(args).map(el => `'${el}'`);
        const sql = `INSERT INTO "User" (${columns}) VALUES (${values}) RETURNING *`;
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        user_name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        let updateValues = '';
        for (const prop in args) {
          if (updateValues.length > 0) updateValues += `, `;
          updateValues += `"${prop}" = '${args[prop]}' `;
        }
        const sql = `UPDATE "User" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        const sql = `DELETE FROM "User" WHERE id = '${args.id}' RETURNING *;`
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    addLanguages: {
      type: LanguagesType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        const columns = Object.keys(args).map(el => `"${el}"`);
        const values = Object.values(args).map(el => `'${el}'`);
        const sql = `INSERT INTO "Languages" (${columns}) VALUES (${values}) RETURNING *`;
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    updateLanguages: {
      type: LanguagesType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        let updateValues = '';
        for (const prop in args) {
          if (updateValues.length > 0) updateValues += `, `;
          updateValues += `"${prop}" = '${args[prop]}' `;
        }
        const sql = `UPDATE "Languages" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    deleteLanguages: {
      type: LanguagesType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        const sql = `DELETE FROM "Languages" WHERE id = '${args.id}' RETURNING *;`
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});