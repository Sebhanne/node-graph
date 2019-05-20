const { GraphQLServer } = require("graphql-yoga");
// // 1
const typeDefs = ` 
type Query { 
    info: String!
    feed: [Link!]!
 }

type Mutation {
   post(url: String!, description: String!): Link!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`;
//1
let links = [
  {
    id: "link-0",
    url: "wwww.howtographql.com",
    description: "Fullstack tutuorial for GraphQL"
  }
];
// 1
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links
  },
  Mutation: {
    //2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};
//   //3
//   Link: {
//     id: parent => parent.id,
//     description: parent => parent.description,
//     url: parent => parent.url
//   }
// };

// const resolvers = {
//   Query: {
//     info: () => null
//   }
// };
// const resolvers = {
//   Query: {
//     info: () => "This is the API of a Hackernews Clone "
//   }
// };
//3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log("Server is running on http://localhost:4000"));
