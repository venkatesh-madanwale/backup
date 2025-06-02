// import { Inject, Module } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { AuthController } from "./auth.contoller";
// import { JwtModule } from "@nestjs/jwt";
// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { ClientsModule, Transport } from "@nestjs/microservices";
// import { JwtStrategy } from "./strategy/jwt.strategy";
// import { config } from "process";


// @Module({
//     imports: [
//         ConfigModule.forRoot({
//             isGlobal:true,
//             envFilePath:'apps/auth/.env'
//         }),
//         ClientsModule.registerAsync([
//             {
//                 name: 'USER_SERVICE',
//                 imports: [ConfigModule],
//                 inject: [ConfigService],
//                 useFactory: async (config: ConfigService) => {
//                     const host = await config.get("USER_SERVICE_HOST");
//                     console.log(`userService host: ${host}`)
//                     return {
//                         transport: Transport.TCP,
//                         options: {
//                             // host: config.get<string>('USER_SERVICE_HOST'),
//                             // port: config.get<number>('USER_SERVICE_PORT')
//                             host: config.get<string>('USER_TCP_HOST'),
//                             port: config.get<number>('USER_TCP_PORT')
//                         }
//                     }
//                 },
//             }
//         ]),
//         JwtModule.registerAsync({
//             imports: [ConfigModule],
//             inject: [ConfigService],
//             useFactory: async (config: ConfigService) => {
//                 return {
//                     secret: config.get<string>('JWT_SECRET'),
//                     signOptions: {
//                         expiresIn: "1d"
//                     }
//                 };
//             }
//         })
//     ],
//     providers: [JwtStrategy, AuthService],
//     controllers: [AuthController],
//     exports: [AuthService]
// })
// export class AuthModule { }




import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.contoller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        // Load environment variables from apps/auth/.env
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/auth/.env',
        }),

        // Register the USER_SERVICE microservice client via TCP
        ClientsModule.registerAsync([
            {
                name: 'USER_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (config: ConfigService) => {
                    // Read host and port from environment variables
                    const host = config.get<string>('USER_TCP_HOST') || '127.0.0.1';
                    const port = config.get<number>('USER_TCP_PORT') || 3006;

                    // Log to confirm values are being read correctly
                    console.log(`USER_SERVICE HOST: ${host}, PORT: ${port}`);

                    return {
                        transport: Transport.TCP,
                        options: {
                            host, // same as host: host
                            port, // same as port: port
                        },
                    };
                },
            },
        ]),

        // Configure JWT authentication
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '1d',
                },
            }),
        }),
    ],

    // Providers and Controllers
    providers: [JwtStrategy, AuthService],
    controllers: [AuthController],
    exports: [AuthService], // Export AuthService if other modules need it
})
export class AuthModule { }
