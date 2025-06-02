import { Inject, Module, UnauthorizedException } from '@nestjs/common';
import { Injectable, ConflictException } from '@nestjs/common';
// import { UserService } from 'src/users/users.service'
// import { RegisterDto } from './src/dto/register.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy, private jwtService: JwtService) { }
    //userService is dependency injection for authentication service
    async register(registerDto: RegisterDto) {
        const { emailid, name, phno, pwd } = registerDto;
        const user = await firstValueFrom(
            this.userClient.send({ cmd: "find-by-email" }, emailid)
        );

        if (user) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(pwd, 10);
        const createdUser = await firstValueFrom(
            this.userClient.send(
                { cmd: "account-create" },
                { emailid, name, phno, pwd: hashedPassword }
            )
        );

        return {
            msg: "User created Successfully!",
            id: createdUser.emailid,
            name: createdUser.name
        };
    }

    async login(loginDto: LoginDto) {
        const { emailid, pwd } = loginDto;
        const user = await firstValueFrom(
            this.userClient.send({
                cmd: "find-by-email"
            }, emailid)
        )
        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const isPasswordValid = await bcrypt.compare(pwd, user.pwd);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const payload = { emailid: user?.emailid, role: user.role }
        const token = this.jwtService.sign({ payload });
        return { "msg": "Login Successful", "email": user.emailid, "name": user.name, "token": token };
    }

    async validatePayload(payload: any) {
    return {
      emailid: payload.emailid,
      role: payload.role,
    }
  }

}
