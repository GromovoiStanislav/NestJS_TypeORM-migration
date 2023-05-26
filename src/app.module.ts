import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ormConfig } from "./data-source";


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return ormConfig;
      }
    }),
    UsersModule
  ]
})
export class AppModule {
}
