"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const typeorm_1 = require("typeorm");
const country_1 = __importDefault(require("./entities/country"));
const typeDefs = `
  type Country {
    id: ID
    name: String
    code: String
    emoji: String
    continentCode: String
  }

  type Query {
    getAllCountries: [Country]
    getCountryByCode(code: String!): Country
    getCountriesByContinent(continentCode: String!): [Country]
  }

  type Mutation {
    InsertCountry(code: String!, name: String!, emoji: String!, continentCode: String!): Country
  }
`;
const resolvers = {
    Query: {
        getAllCountries: async () => {
            const countries = await country_1.default.getCountries();
            return countries;
        },
        getCountryByCode: async (_, { code }) => {
            return country_1.default.getCountryByCode(code);
        },
        getCountriesByContinent: async (_, { continentCode }) => {
            return country_1.default.searchCountryByContinent(continentCode);
        },
    },
    // Mutation: {
    //   InsertCountry: async ({ code, name, emoji }: { code: string, name: string, emoji: string }) => {
    //     const newCountry = await Country.createCountry(code, name, emoji);
    //     return newCountry;
    //   }
    // }
    Mutation: {
        InsertCountry: async (_, args) => {
            const { code, name, emoji, continentCode } = args;
            const newCountry = await country_1.default.createCountry(code, name, emoji, continentCode);
            return newCountry;
        },
    },
};
const startServer = async () => {
    const server = new server_1.ApolloServer({
        typeDefs,
        resolvers,
    });
    const dataSource = new typeorm_1.DataSource({
        type: "sqlite",
        database: "CountriesDB.sqlite",
        entities: [country_1.default],
        synchronize: true,
    });
    await dataSource.initialize();
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀 Server listening at: ${url}`);
};
startServer();
