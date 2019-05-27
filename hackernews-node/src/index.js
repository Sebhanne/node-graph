// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var prisma_lib_1 = require("prisma-client-lib");
// var typeDefs = require("./prisma-schema").typeDefs;

// var models = [
//   {
//     name: "User",
//     embedded: false
//   }
// ];
// exports.Prisma = prisma_lib_1.makePrismaClientClass({
//   typeDefs,
//   models,
//   endpoint: `https://eu1.prisma.sh/ijelynsaele/hackernews-node/dev`
// });
// exports.prisma = new exports.Prisma();
const { prisma } = require("./generated/prisma-client");
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
  }
};
const server = new GrapQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});
