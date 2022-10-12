import { Injectable } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { CreatePodcastsInput, UpdatePodcastsInput } from './dtos/podcasts.dto';
import { CreateEpisodesInput, UpdateEpisodesInput } from './dtos/episodes.dto';
import {
  INTERNAL_EXCEPTION,
  NOT_FOUND_EPISODE,
  NOT_FOUND_PODCAST,
} from './podcsts.error-message';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];
  genPodcastId = 0;
  genEpisodeId = 0;

  autoIncrementId(identifier: string): number {
    if (identifier === 'p') return ++this.genPodcastId;
    if (identifier === 'e') return ++this.genEpisodeId;
  }

  getAllPodcasts(): Podcast[] {
    return this.podcasts;
  }

  getPodcast(id: number): Podcast {
    return this.podcasts.find((podcast) => podcast.id === id);
  }

  createPodcast(createPodcastsInput: CreatePodcastsInput): Podcast {
    const podcast: Podcast = {
      id: this.genPodcastId,
      ...createPodcastsInput,
      rating: 0,
      episodes: [],
    };
    this.podcasts.push(podcast);
    return podcast;
  }

  patchPodcast(id: number, updatePodcastsInput: UpdatePodcastsInput): Podcast {
    const podcast = this.getPodcast(id);
    if (!podcast) throw new Error(NOT_FOUND_PODCAST);
    for (const key in { ...updatePodcastsInput }) {
      podcast[key] = updatePodcastsInput[key];
    }
    return podcast;
  }

  deletePodcast(id: number) {
    this.podcasts = this.podcasts.filter((p) => p.id !== id);
  }

  getEpisodes(podcastId: number): Episode[] {
    const podcast = this.getPodcast(podcastId);
    if (!podcast) throw new Error(NOT_FOUND_PODCAST);
    return podcast.episodes;
  }

  findEpisode(podcastId: number, episodeId: number): Episode {
    try {
      const result = this.getEpisodes(podcastId);
      return result.find((e) => e.id === episodeId);
    } catch (error) {
      throw error;
    }
  }
  createEpisode(
    podcastId: number,
    createEpisodesInput: CreateEpisodesInput,
  ): Episode {
    const podcast = this.getPodcast(podcastId);
    if (!podcast) throw new Error(NOT_FOUND_PODCAST);
    const episode: Episode = {
      id: this.genPodcastId,
      ...createEpisodesInput,
      rating: 0,
    };
    try {
      this.patchPodcast(podcastId, {
        episodes: [...podcast.episodes, episode],
      });
      return episode;
    } catch (error) {
      throw new Error(INTERNAL_EXCEPTION);
    }
  }

  updateEpisode(
    podcastId: number,
    episodeId: number,
    updateEpisodesInput: UpdateEpisodesInput,
  ): Episode {
    try {
      const episode = this.findEpisode(podcastId, episodeId);
      if (!episode) {
        throw new Error(NOT_FOUND_EPISODE);
      }
      const podcast = this.getPodcast(podcastId);
      this.patchPodcast(podcastId, {
        ...podcast,
        episodes: [...podcast.episodes, { ...episode, ...updateEpisodesInput }],
      });
      return episode;
    } catch (error) {
      throw error;
    }
  }

  deleteEpisode(podcastId: number, episodeId: number) {
    const podcast = this.getPodcast(podcastId);
    if (!podcast) throw new Error(NOT_FOUND_PODCAST);
    try {
      this.patchPodcast(podcastId, {
        episodes: podcast.episodes.filter((e) => e.id !== episodeId),
      });
    } catch (error) {
      throw new Error(INTERNAL_EXCEPTION);
    }
  }
}
