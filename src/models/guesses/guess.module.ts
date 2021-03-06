import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/authentication/auth.module";
import { Guess } from "./entities/guess.entity";
import { GuessController } from "./guess.controller";
import { GuessService } from "./guess.service";
import { LocationModule } from 'src/models/locations/location.module'
import { ConfigModule } from "@nestjs/config";
import { S3BucketService } from "src/common/s3-bucket/s3-bucket.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Guess]),

        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME }
        }),

        //Imported modules
        LocationModule, AuthModule
    ],
    controllers: [GuessController],
    providers: [GuessService, S3BucketService],
})
export class GuessModule { }