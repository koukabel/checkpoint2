"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Country_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
let Country = Country_1 = class Country extends typeorm_1.BaseEntity {
    constructor(country) {
        super();
        if (country) {
            this.name = country.name || '';
            this.code = country.code || '';
            this.emoji = country.emoji || '';
            this.continentCode = country.continentCode || '';
        }
    }
    static async getCountries() {
        const countries = await Country_1.find();
        return countries;
    }
    static async getCountryByCode(code) {
        const countryWithCode = await Country_1.findOne({ where: { code: code } });
        if (!countryWithCode) {
            throw new Error("Country with this code does not exist");
        }
        return countryWithCode;
    }
    static async searchCountryByContinent(continent) {
        const countries = await Country_1.find({ where: { continentCode: continent } });
        if (!countries || countries.length === 0) {
            throw new Error("Countries with this continent code do not exist ");
        }
        return countries;
    }
    static async createCountry(code, name, emoji, continentCode) {
        const newCountry = new Country_1();
        newCountry.code = code;
        newCountry.name = name;
        newCountry.emoji = emoji;
        newCountry.continentCode = continentCode;
        const savedCountry = await newCountry.save();
        return savedCountry;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], Country.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Country.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Country.prototype, "emoji", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Country.prototype, "continentCode", void 0);
Country = Country_1 = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Country);
exports.default = Country;
