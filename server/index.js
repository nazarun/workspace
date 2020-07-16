const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Shape {
    id: String!
    title: String
    x: Int!
    y: Int!
    width: Int!
    height: Int!
    background: String
    border: String
  }

  type Query {
    shapes: [Shape]
  }
`;

const shapes = [
  {
    id: "1",
    title: "Big dark rectangle",
    x: 50, y: 50,
    width: 100, height: 100,
    background: 'gray',
  },
  {
    id: "2",
    title: "Small light rectangle",
    x: 200, y: 50,
    width: 50, height: 50,
    background: '#CCC',
  },
  {
    id: "3",
    title: "Big transparent rectangle with border",
    x: 200, y: 200,
    width: 100, height: 100,
    background: 'transparent',
    border: '1px solid #333',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema.
const resolvers = {
  Query: {
    shapes: () => shapes,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
