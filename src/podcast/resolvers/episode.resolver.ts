import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';
import { PodcastsService } from '../podcasts.service';
import {
  CreateEpisodesInput,
  EpisodeListOutput,
  EpisodeOutput,
  UpdateEpisodesInput,
} from '../dtos/episodes.dto';
import { CommonOutput } from '../dtos/output.dto';

@Resolver(() => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastsService: PodcastsService) {}
  @Query(() => EpisodeListOutput)
  getEpisodes(@Args('id') id: number): EpisodeListOutput {
    try {
      const episodes = this.podcastsService.getEpisodes(id);
      return { isOK: true, episodes };
    } catch (error) {
      return { isOK: false, error: error.message };
    }
  }

  @Mutation(() => EpisodeOutput)
  createEpisode(
    @Args('id') id: number,
    @Args('input') input: CreateEpisodesInput,
  ): EpisodeOutput {
    try {
      const episode = this.podcastsService.createEpisode(id, input);
      return { isOK: true, episode };
    } catch (error) {
      return { isOK: false, error: error.message };
    }
  }

  @Mutation(() => EpisodeOutput)
  patchEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
    @Args('input') updateEpisodesInput: UpdateEpisodesInput,
  ): EpisodeOutput {
    try {
      const episode = this.podcastsService.patchEpisode(
        podcastId,
        episodeId,
        updateEpisodesInput,
      );
      return { isOK: true, episode };
    } catch (error) {
      return { isOK: false, error: error.message };
    }
  }

  @Mutation(() => CommonOutput)
  deleteEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): CommonOutput {
    try {
      this.podcastsService.deleteEpisode(podcastId, episodeId);
      return { isOK: true };
    } catch (error) {
      return { isOK: false, error: error.message };
    }
  }
}
