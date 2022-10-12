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
import { Episode } from '../entities/episode.entity';

@InputType()
export class CreatePodcastsInput extends PickType(Podcast, [
  'title',
  'category',
]) {}

/**
 * Please Help !! ..
 * this input make issue... when i comment out the method that use this input type in resolver, application work well,
 * but when this input type used in the resolver throw bellow error...
 *
 * error message :
 * Error: Schema must contain uniquely named types but contains multiple types named "Episode".
 *     at new GraphQLSchema (/Users/jonghyeon/WebstormProjects/code-sandbox-assignment2/node_modules/graphql/type/schema.js:194:15)
 *     at GraphQLSchemaFactory.<anonymous> (/Users/jonghyeon/WebstormProjects/code-sandbox-assignment2/node_modules/@nestjs/graphql/dist/schema-builder/graphql-schema.factory.js:40:28)
 *     at Generator.next (<anonymous>)
 *     at /Users/jonghyeon/WebstormProjects/code-sandbox-assignment2/node_modules/tslib/tslib.js:114:75
 *     at new Promise (<anonymous>)
 *     at Object.__awaiter (/Users/jonghyeon/WebstormProjects/code-sandbox-assignment2/node_modules/tslib/tslib.js:110:16)
 *     at GraphQLSchemaFactory.create (/Users/jonghyeon/WebstormProjects/code-sandbox-assignment2/node_modules/@nestjs/graphql/dist/schema-builder/graphql-schema.factory.js:29:24)
 *     at GraphQLSchemaBuilder.<anonymous> (/Users/jonghyeon/WebstormProjects/code-sandbox-assignment2/node_modules/@nestjs/graphql/dist/graphql-schema.builder.js:56:56)
 *     at Generator.next (<anonymous>)
 *     at /Users/jonghyeon/WebstormProjects/code-sandbox-assignment2/node_modules/tslib/tslib.js:114:75
 */

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
  podcasts?: Podcast[];
}
