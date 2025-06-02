import { NestFactory } from '@nestjs/core';
import { UsersModule } from './user.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const config = app.get(ConfigService)

  //HTTP configs
  const port = config.get<number>("USER_PORT")

  //TCP port and host configs
  const tcpPort = config.get<number>("USER_TCP_PORT")
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: config.get<string>("USER_TCP_HOST"),
      port: tcpPort
    }
  })

  await app.startAllMicroservices()
  await app.listen(port ?? 3001);
  console.log(`User micro service listening on port ${port ?? 3001}`)
}
bootstrap();
