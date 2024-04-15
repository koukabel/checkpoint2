import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { DataSource } from "typeorm";
import Country from "./entities/country";
import { MutationArgs } from "./types";

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
      const countries = await Country.getCountries();
      return countries;
    },

    getCountryByCode: async (_: any, { code }: { code: string }) => {
      return Country.getCountryByCode(code);
    },

    getCountriesByContinent: async (_: any, { continentCode }: { continentCode: string }) => {
      return Country.searchCountryByContinent(continentCode);
    },
  },

  // Mutation: {
  //   InsertCountry: async ({ code, name, emoji }: { code: string, name: string, emoji: string }) => {
  //     const newCountry = await Country.createCountry(code, name, emoji);
  //     return newCountry;
  //   }
  // }

  Mutation: {
    InsertCountry: async (_: any, args: MutationArgs) => {
      const { code, name, emoji, continentCode } = args;
      const newCountry = await Country.createCountry(code, name, emoji, continentCode);
      return newCountry;
    },
  },
};

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const dataSource = new DataSource({
    type: "sqlite",
    database: "CountriesDB.sqlite",
    entities: [Country],
    synchronize: true,
  });

  await dataSource.initialize();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server listening at: ${url}`);
};

startServer();
