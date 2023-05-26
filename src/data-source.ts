import { DataSource } from "typeorm";
import "dotenv/config";
import { join } from "node:path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User } from "./typeorm/User";
import { Post } from "./typeorm/Post";
import { Profile } from "./typeorm/Profile";


export const ormConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  //entities: [join(__dirname, "**", "*.entity.{ts,js}")],
  entities: [User, Post, Profile],
  migrations: [__dirname + "/migration/*.{ts,js}"],
  subscribers: []
};


export default new DataSource({ ...ormConfig });