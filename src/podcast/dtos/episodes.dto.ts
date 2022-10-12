import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CommonOutput } from './output.dto';
import { Episode } from '../entities/episode.entity';

@ObjectType()
export class EpisodeDto extends OmitType(Episode, ['id']) {}

@InputType()
export class CreateEpisodesInput extends PickType(Episode, [
  'title',
  'category',
]) {}

@InputType()
export class UpdateEpisodesInput extends PartialType(
  OmitType(Episode, ['id']),
) {}

@ObjectType()
export class EpisodeOutput extends CommonOutput {
  @Field(() => Episode, { nullable: true })
  episode?: Episode;
}

@ObjectType()
export class EpisodeListOutput extends CommonOutput {
  @Field(() => [Episode], { nullable: true })
  episodes?: Episode[];
}
