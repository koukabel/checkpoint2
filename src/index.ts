import { DataSource } from "typeorm";
import Country from "./";
import "reflect-metadata";



async function main () {


const dataSource = new DataSource({
    type: "sqlite",
    database: "CountriesDB.sqlite",
    entities: [Country],
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

main()