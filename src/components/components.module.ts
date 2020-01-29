import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

import { HistoryModule } from './history/history.module';
import { VideoModule } from './video/video.module';

import { NearbyModule } from './nearby/nearby.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, NearbyModule,AuthModule, HistoryModule,VideoModule ]

})
export class ComponentsModule {}
