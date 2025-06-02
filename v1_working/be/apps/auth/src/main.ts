import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const config = app.get(ConfigService)
  //HTTP configs
  const port = config.get<number>("AUTH_PORT")

  //TCP port and host configs
  const tcpPort = config.get<number>("AUTH_TCP_PORT")
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: config.get<string>("AUTH_TCP_HOST"),
      port: tcpPort
    }
  })

  await app.startAllMicroservices()
  await app.listen(port ?? 3000);
  console.log(`Auth micro service listening on port ${port ?? 3000}`)
}
bootstrap();
