import { Episode } from './episode.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
@ObjectType()
export class Podcast {
  @Field((type) => Number)
  id: number;

  @Field((type) => Number)
  title: string;

  @Field((type) => Number)
  category: string;

  @Field((type) => Number, { nullable: true })
  rating: number;

  @Field((type) => [Episode], { nullable: true })
  episodes: Episode[];
}
