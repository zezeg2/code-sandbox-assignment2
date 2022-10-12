import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';
import { PodcastsService } from '../podcasts.service';
import {
  CreatePodcastsInput,
  PodcastListOutput,
  PodcastOutput,
  UpdatePodcastsInput,
} from '../dtos/podcasts.dto';
import { CommonOutput } from '../dtos/output.dto';
import { NOT_FOUND_PODCAST } from '../podcasts.error-message';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => PodcastListOutput)
  getAllPodcasts(): PodcastListOutput {
    return { isOK: true, podcasts: this.podcastsService.getAllPodcasts() };
  }

  @Query(() => PodcastOutput)
  getPodcast(@Args('id') id: number): PodcastOutput {
    const podcast = this.podcastsService.getPodcast(id);
    if (!podcast) return { isOK: false, error: NOT_FOUND_PODCAST };
    return { isOK: true, podcast };
  }

  @Mutation(() => PodcastOutput)
  createPodcast(@Args('input') input: CreatePodcastsInput): PodcastOutput {
    return {
      isOK: true,
      podcast: this.podcastsService.createPodcast(input),
    };
  }

  /**
   * Below patchPodcast method make issue...
   */

  @Mutation(() => PodcastOutput)
  patchPodcast(
    @Args('id') id: number,
    @Args('input') input: UpdatePodcastsInput, // this inputType defined in root_dir/src/podcast/dtos/podcast.dto.ts UpdatePodcastInput
  ): PodcastOutput {
    try {
      const podcast = this.podcastsService.patchPodcast(id, input);
      return { isOK: true, podcast };
    } catch (error) {
      return { isOK: false, error: error.message };
    }
  }

  @Mutation(() => CommonOutput)
  deletePodcast(@Args('id') id: number): CommonOutput {
    this.podcastsService.deletePodcast(id);
    return { isOK: true };
  }
}
