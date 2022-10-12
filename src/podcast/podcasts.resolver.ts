import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';
import {
  CreatePodcastsInput,
  PodcastListOutput,
  PodcastOutput,
} from './dtos/podcasts.dto';
import { CommonOutput } from './dtos/output.dto';
import { EpisodeListOutput, EpisodeOutput } from './dtos/episodes.dto';

@Resolver((type) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => PodcastListOutput)
  getAllPodcasts() {}

  @Query(() => PodcastOutput)
  getPodcast(id: string) {}

  @Mutation((type) => PodcastOutput)
  createPodcast(@Args('input') createPodcastsInput: CreatePodcastsInput) {}

  @Mutation((type) => PodcastOutput)
  patchPodcast() {}

  @Mutation((type) => CommonOutput)
  deletePodcast() {}

  @Query(() => EpisodeListOutput)
  getEpisodes() {}

  @Mutation((type) => EpisodeOutput)
  createEpisode() {}

  @Mutation((type) => EpisodeOutput)
  patchEpisode() {}

  @Mutation((type) => CommonOutput)
  deleteEpisode() {}
}
