/*
 * In this file the base Graphql
 * schema is declared and mounted
 */

//? Import section
import { AuthenticationError } from "apollo-server-errors";
import { GraphQLServer } from "graphql-yoga"; //? Get GraphQLServer object
import { schema } from "./graphql/index.js"; //? Get modularized schema for the Api
import { tools } from "./tools/index.js";

//* Export new Graphql Api instance as server
export const server = new GraphQLServer({
  uploads: false,
  schema,
  context: async ({ request }) => {
    const token = request.headers.token || "";
    const license = await tools.auth.getLicense(token);

    return { license };
  },
});
