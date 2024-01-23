import { Controller, Get, Post, Body, UseGuards, Req, Headers, Query, Param, Patch, ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import { RawHeaders, GetUser, Auth, HttpHeaders } from './decorators';
import { RoleProtected } from './decorators/role-protected.decorator';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    
    ) {}


  @Patch(':id')
  @Auth( ValidRoles.admin , ValidRoles.superUser )
  @ApiBearerAuth()
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() UpdateUserDto: UpdateUserDto,
  ) {
    return this.authService.update( id, UpdateUserDto );
  }


  @Get(':term')
  @Auth( ValidRoles.admin , ValidRoles.superUser )
  @ApiBearerAuth()
  findOne(@Param( 'term' ) term: string) {
    return this.authService.findOnePlain( term );
  }

  @Get()
  @Auth( ValidRoles.admin , ValidRoles.superUser )
  @ApiBearerAuth()
  findAll( @Query() paginationDto:PaginationDto ) {
      // console.log(paginationDto)
      return this.authService.findAll( paginationDto );
  }


  @Post('register')
  @Auth( ValidRoles.admin , ValidRoles.superUser )
  @ApiBearerAuth()
  createUser(@Body() createUserDto: CreateUserDto ) {
    return this.authService.create( createUserDto );
  }

  @Post('login')
  loginUser(
    @Body() loginUserDto: LoginUserDto,
    @HttpHeaders() login_data: any,
   ) 
  
  {
    return this.authService.login( loginUserDto,login_data );
  }

  @Get('check-status')
  @ApiBearerAuth()
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }

/*
  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {


    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }


  // @SetMetadata('roles', ['admin','super-user'])

  @Get('private2')
  @RoleProtected( ValidRoles.superUser, ValidRoles.admin )
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }


  @Get('private3')
  @Auth( )
  @ApiBearerAuth()
  privateRoute3(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  } */



}
