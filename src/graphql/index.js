/*
 * In this file we create
 * the Graph schema based
 * on a modular architecture.
 */

//? Import secction
import { makeExecutableSchema } from "apollo-server"; //? Get schema creation method.
import lodash from "lodash"; //? Get lodash instance for merge objects

//? Graphql Api Modules
import { baseApi } from "./modules/default/index.js";
import { Appointment } from "./modules/Appointment/index.js";
import { Files } from "./modules/File/index.js";
import { MedicalRecord } from "./modules/MedicalRecord/index.js";
import { Modality } from "./modules/Modality/index.js";
import { Recipes } from "./modules/Recipes/index.js";
import { Roles } from "./modules/Role/index.js";
import { Survey } from "./modules/Survey/index.js";
import { Test } from "./modules/Test/index.js";
import { Users } from "./modules/User/index.js";
import { UserData } from "./modules/UserData/index.js";

const resolvers = {}; //? Empty array for get the merged content of the modules imported.

//? The schema is created and exported. Defining yout data types and resolvers
export const schema = makeExecutableSchema({
  typeDefs: [
    baseApi.typeDef,
    Appointment.typeDef,
    Files.typeDef,
    MedicalRecord.typeDef,
    Modality.typeDef,
    Recipes.typeDef,
    Roles.typeDef,
    Survey.typeDef,
    Test.typeDef,
    Users.typeDef,
    UserData.typeDef,
  ], //? data types
  resolvers: lodash.merge(
    resolvers,
    baseApi.resolvers,
    Appointment.resolvers,
    Files.resolvers,
    MedicalRecord.resolvers,
    Modality.resolvers,
    Recipes.resolvers,
    Roles.resolvers,
    Survey.resolvers,
    Test.resolvers,
    Users.resolvers,
    UserData.resolvers
  ), //? resolvers
});
