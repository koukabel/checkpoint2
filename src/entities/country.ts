import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
class Country {
//     @PrimaryGeneratedColumn()
//     @Field(() => ID)
//     id!: number;

//     @Column()
//   @Field()
//   name!: string;
  
@Column()
  @Field()
code!: number;

@Column()
  @Field()
emoji!: string;

}

 export default Country;


