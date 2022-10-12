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
  @Field(() => Podcast, { nullable: true })
  podcast?: Podcast;
}

@ObjectType()
export class PodcastListOutput extends CommonOutput {
  @Field(() => [Podcast], { nullable: true })
  podcasts?: PodcastDto[];
}
