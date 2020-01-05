const express = require('express');

const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema')

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://akash:akash@testdatabase-rzlsd.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology: true});

mongoose.connection.once('open',()=>{
    console.log('connection successful');
});

const app = express();

app.use('/graphql',graphqlHTTP({

    schema,
    graphiql:true,
}));

app.listen(4000,()=>{
    console.log('Hey there Delialah!')
})