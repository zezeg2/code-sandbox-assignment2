import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsResolver } from './podcasts.resolver';

@Module({
  controllers: [],
  providers: [PodcastsService, PodcastsResolver],
})
export class PodcastsModule {}
