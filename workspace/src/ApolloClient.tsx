import {
    ApolloClient,
    gql,
    InMemoryCache,
    NormalizedCacheObject
} from '@apollo/client';

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

// test query
client
.query({
  query: gql`
      query GetShapes {
          shapes {
              id
              title
              x
              y
              width
              height
              background
          }
      }

  `
}).then(result => console.log(result))
.catch(err => console.log(err));
