import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsResolver } from './resolvers/podcast.resolver';
import { EpisodeResolver } from './resolvers/episode.resolver';

@Module({
  controllers: [],
  providers: [PodcastsService, PodcastsResolver, EpisodeResolver],
})
export class PodcastsModule {}
