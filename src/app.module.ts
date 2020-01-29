import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentsModule } from './components/components.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AudioModule } from './components/audio/audio.module';
import config from './config/config'

@Module({
  imports: [ComponentsModule,MongooseModule.forRoot(config.mongoURI), AudioModule,],
  // imports: [ComponentsModule,MongooseModule.forRoot('mongodb+srv://user1:user1@invictatour-rrvgz.gcp.mongodb.net/test?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
