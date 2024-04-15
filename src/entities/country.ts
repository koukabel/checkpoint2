import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";

@Entity()
class Country  extends BaseEntity {
@PrimaryGeneratedColumn()
@Field(() => ID)
  id!: number;

@Column()
@Field()
  name!: string;
  
 @Column()
 @Field()
 code!: string;

@Column()
@Field()
 emoji!: string;

 @Column()
 @Field() 
continentCode!: string;

constructor(country?:  Partial<Country>) {
  super();
  if (country) {
    this.name = country.name || '';
    this.code = country.code || '';
    this.emoji = country.emoji || '';
    this.continentCode= country.continentCode || ''
  }
}

static async getCountries(): Promise<Country[]> {
  const countries = await Country.find();
  return countries;
}

static async getCountryByCode(code: string): Promise<Country> {
  const countryWithCode = await Country.findOne({ where: { code: code } });
  if (!countryWithCode) {
    throw new Error("Country with this code does not exist");
  }
  return countryWithCode;
}


static async searchCountryByContinent(continent: string): Promise<Country[]> {
  const countries = await Country.find({ where: { continentCode: continent } });
  if (!countries || countries.length === 0) {
    throw new Error("Countries with this continent code do not exist ");
  }
  return countries;
}


static async createCountry(code: string, name: string, emoji: string, continentCode: string): Promise<Country> {
  const newCountry = new Country();
  newCountry.code = code;
  newCountry.name = name;
  newCountry.emoji = emoji;
  newCountry.continentCode =  continentCode;
  const savedCountry = await newCountry.save();
  return savedCountry;
}
}
 export default Country;

