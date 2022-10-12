// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { CreateEpisodeDto } from './dtos/create-episode.dto';
// import { CreatePodcastDto } from './dtos/create-podcast.dto';
// import { UpdateEpisodeDto } from './dtos/update-episode.dto';
// import { UpdatePodcastDto } from './dtos/update-podcast.dto';
// import { PodcastsResolver } from './podcasts.resolver';
//
// @Controller('/podcasts')
// export class PodcastsController {
//   constructor(private readonly podcastsResolver: PodcastsResolver) {}
//
//   @Get()
//   getAllPodcasts() {
//     return this.podcastsResolver.getAllPodcasts();
//   }
//
//   @Post()
//   createPodcast(@Body() createPodcastDto: CreatePodcastDto) {
//     return this.podcastsResolver.createPodcast(createPodcastDto);
//   }
//
//   @Get('/:id')
//   getPodcast(@Param('id') id: number) {
//     return this.podcastsResolver.getPodcast(id);
//   }
//
//   @Patch('/:id')
//   updatePodcast(
//     @Param('id') id: number,
//     @Body() updatePodcastDto: UpdatePodcastDto,
//   ) {
//     return this.podcastsResolver.patchPodcast(id, updatePodcastDto);
//   }
//
//   @Delete('/:id')
//   deletePodcast(@Param('id') id: number) {
//     return this.podcastsResolver.deletePodcast(id);
//   }
// }
//
// @Controller('/podcasts/:id')
// export class EpisodeController {
//   constructor(private readonly podcastsResolver: PodcastsResolver) {}
//   @Get('/episodes')
//   getEpisodes(@Param('id') podcastId: number) {
//     return this.podcastsResolver.getEpisodes(podcastId);
//   }
//
//   @Post('/episodes')
//   createEpisode(
//     @Param('id') podcastId: number,
//     @Body() createEpisodeDto: CreateEpisodeDto,
//   ) {
//     return this.podcastsResolver.createEpisode(podcastId, createEpisodeDto);
//   }
//
//   @Patch('/episodes/:episodeId')
//   updateEpisode(
//     @Param('id') podcastId: number,
//     @Param('episodeId') episodeId: number,
//     @Body() updateEpisodeDto: UpdateEpisodeDto,
//   ) {
//     return this.podcastsResolver.patchEpisode(
//       podcastId,
//       episodeId,
//       updateEpisodeDto,
//     );
//   }
//
//   @Delete('/episodes/:episodeId')
//   deleteEpisode(
//     @Param('id') podcastId: number,
//     @Param('episodeId') episodeId: number,
//   ) {
//     return this.podcastsResolver.deleteEpisode(podcastId, episodeId);
//   }
// }
