
require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql-schema');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './public')))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: false //Set to true to view GraphiQl in browser at /graphql
}));

app.listen(4000, () => {
  console.log('Listening on 4000')
});
