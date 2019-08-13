const {
    ApolloClient
} = require('apollo-boost');
const fetch = require('node-fetch');
// import fetch from 'node-fetch';
// import {
//     InMemoryCache
// } from 'apollo-cache-inmemory';
// import {
//     HttpLink
// } from 'apollo-link-http';
const {InMemoryCache} = require('apollo-cache-inmemory');
const {HttpLink} = require('apollo-link-http');
const gql = require('graphql-tag');
const recipesFile = require('./recipeFileData');


const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://ec2-13-59-178-203.us-east-2.compute.amazonaws.com:4000/graphql',
    fetch
})

const client = new ApolloClient({
    cache,
    link
})

client
    .query({
        query: gql `
        query GetRecipes{
            contentWithFilesData(path : "./filesystem/Recipes"){
                children {
                    name
                    path
                    type
                    content
                    children {
                        name
                    }
                }
            }
        }
    `
    })
    .then(result => {
        // console.log(result.data.contentWithFilesData.children);
        recipesFile.stripFile(result.data.contentWithFilesData.children);


    })
    .catch(error => console.error(error));