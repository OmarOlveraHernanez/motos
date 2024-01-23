import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { LoginUser } from '../entities/login.entity'; 
@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,
        
        @InjectRepository(LoginUser)
        private readonly loginUserRepository: Repository<LoginUser>,
        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate( payload: JwtPayload ): Promise<User> {
        const { id , id_log } = payload;
        const user = await this.userRepository.findOneBy({ id });
        if ( !user ) 
            throw new UnauthorizedException('Token not valid') 
        if ( !user.isActive ) 
            throw new UnauthorizedException('User is inactive, talk with an admin');
        const login_user = await this.loginUserRepository.findOne({ where: {
            id: id_log,
            user: { id: id },
          },});  
        if(!login_user)
            throw new UnauthorizedException('Token not valid')
        
        if (login_user.timeVigency <  new Date()) 
            throw new UnauthorizedException('timeVigency outime')
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() + 8);
        login_user.timeVigency = fechaActual;
        await this.loginUserRepository.save(login_user);
        return user;
    }

}