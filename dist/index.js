"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('hello');
const typeorm_1 = require("typeorm");
const country_1 = __importDefault(require("./country"));
require("reflect-metadata");
async function main() {
    const dataSource = new typeorm_1.DataSource({
        type: "sqlite",
        database: "CountriesDB.sqlite",
        entities: [country_1.default],
        synchronize: true,
    });
    const PORT = 4000;
    //const startApolloServer = async () => {
    //   const schema = await buildSchema({
    //     resolvers: [AdResolver, TagResolver],
    //     validate: true,
    //   });
    //   const server = new ApolloServer({ schema });
    //   const { url } = await startStandaloneServer(server, {
    //     listen: { port: PORT },
    //   });
    //   await dataSource.initialize();
    //   await Category.saveNewCategoryIfNotExisting({ id: 1, name: "Ameublement" });
    //   await Category.saveNewCategoryIfNotExisting({
    //     id: 2,
    //     name: "Électroménager",
    //   });
    //console.log(`🚀  Server ready at: ${url}`);
    //};
    await dataSource.initialize();
}
//startApolloServer();
main();
