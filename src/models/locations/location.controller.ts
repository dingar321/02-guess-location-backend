import { Body, Controller, Get, Param, Post, Query, Req, UnauthorizedException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LocationAddDecorator } from "src/common/decorators/location-add.decorator";
import { LocationAddDto } from "./dto/location-add.dto";
import { LocationService } from "./location.service";
import { Request } from 'express';
import { AuthService } from "src/authentication/auth.service";
import { Location } from "./entities/location.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";


@ApiTags('location')
@Controller()
export class LocationController {
    constructor(private locationService: LocationService, private jwtService: JwtService, private authService: AuthService) { }

    @ApiOperation({ summary: 'Add a new location' })
    @Post('location/add')
    @ApiConsumes('multipart/form-data')
    @LocationAddDecorator()
    @UseInterceptors(FileInterceptor('locationImage'))
    async locationAdd(@Body() locationAddDto: LocationAddDto, @UploadedFile() locationImage: Express.Multer.File, @Req() request: Request): Promise<Location> {

        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException('You must be signed in to access this function');
            }

            //Getting the user that is adding  
            const foundUser = await this.authService.findOneUserId(data.id)
            return await this.locationService.create(locationAddDto, locationImage, foundUser);

        } catch (e) {
            throw new UnauthorizedException('You must be signed in to access this function');
        }
    }

    @ApiOperation({ summary: 'Get random location/post' })
    @Get('location/random')
    async locationRadnom(): Promise<Location> {
        return await this.locationService.findRandom();
    }

    @ApiOperation({ summary: 'Get all locations/posts (Pagination)' })
    @Get('location/list/limit=:limit')
    async locations(@Param('limit') limit: number): Promise<Location[]> {
        return await this.locationService.findAll(limit);
    }



}