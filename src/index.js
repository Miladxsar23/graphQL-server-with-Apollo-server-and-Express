import { ApolloServer } from "apollo-server-express";
import express from "express";

const schema=""
const resolver=""

const app = express()
const server = new ApolloServer({
    typeDefs : schema, 
    resolver
})

server.applyMiddleware({app, path:"/graphql"})

app.listen(8000, () => {
    console.log('server run http://localhost:8000/graphql')
})
