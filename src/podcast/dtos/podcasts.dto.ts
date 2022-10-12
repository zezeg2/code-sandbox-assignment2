import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';
import { CommonOutput } from './output.dto';

@ObjectType()
export class PodcastDto extends OmitType(Podcast, ['id']) {}

@InputType()
export class CreatePodcastsInput extends PickType(Podcast, [
  'title',
  'category',
]) {}

@InputType()
export class UpdatePodcastsInput extends PartialType(
  OmitType(Podcast, ['id']),
) {}

@ObjectType()
export class PodcastOutput extends CommonOutput {
  @Field((type) => PodcastDto, { nullable: true })
  podcasts?: PodcastDto | PodcastDto[];
}

@ObjectType()
export class PodcastListOutput extends CommonOutput {
  @Field((type) => [Podcast], { nullable: true })
  podcasts?: PodcastDto | PodcastDto[];
}