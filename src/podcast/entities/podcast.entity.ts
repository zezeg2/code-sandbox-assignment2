import { Episode } from './episode.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('PodcastInputType', { isAbstract: true })
@ObjectType()
export class Podcast {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  category: string;

  @Field(() => Number, { nullable: true })
  rating: number;

  @Field(() => [Episode], { nullable: true })
  episodes: Episode[];
}
