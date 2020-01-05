const graphql = require('graphql');

const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

// var books = [
//     {name:'a',id:'1',authorId:'1'},
//     {name:'b',id:'2',authorId:'2'},
//     {name:'c',id:'3',authorId:'3'},
// ];

// var authors = [
//     {name:'a',id:'1',age:'20'},
//     {name:'b',id:'2',age:'30'},
//     {name:'c',id:'3',age:'40'},
// ];

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'book',
    fields:() =>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args)
            {
                //return _.find(authors,{id:parent.authorId})
            }
        }
        // genre:{type:GraphQLString}
    })

});

const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields:() =>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args)
            {
                //return _.filter(books,{authorId:parent.id})
            }

        }
        // genre:{type:GraphQLString}
    })

});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            
            resolve(parent,args)
            {
                //code to get data from database/other source
               //return _.find(books,{id:args.id});
            }
        },
        author:{
            type: AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args)
            {
               //return _.find(authors,{id:args.id});
            }
        

        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return books;
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});