import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/models/users/entities/user.entity";
import { S3BucketService } from "src/common/s3-bucket/s3-bucket.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, S3BucketService],
    exports: [AuthService],
})
export class AuthModule { }