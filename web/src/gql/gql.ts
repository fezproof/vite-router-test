/* eslint-disable */
import * as types from './graphql.js';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  fragment filmCrawl on Film {\n    openingCrawl\n  }\n": types.FilmCrawlFragmentDoc,
    "\n  fragment filmHeading on Film {\n    title\n    director\n    episodeID\n  }\n": types.FilmHeadingFragmentDoc,
    "\n  query filmDetailsQuery($id: ID!) {\n    film(id: $id) {\n      id\n      ...filmHeading\n      ...filmCrawl\n    }\n  }\n": types.FilmDetailsQueryDocument,
    "\n  query allFilmsQuery {\n    allFilms {\n      films {\n        id\n        ...filmHeading\n        ...filmCrawl\n      }\n    }\n  }\n": types.AllFilmsQueryDocument,
};

export function graphql(source: "\n  fragment filmCrawl on Film {\n    openingCrawl\n  }\n"): (typeof documents)["\n  fragment filmCrawl on Film {\n    openingCrawl\n  }\n"];
export function graphql(source: "\n  fragment filmHeading on Film {\n    title\n    director\n    episodeID\n  }\n"): (typeof documents)["\n  fragment filmHeading on Film {\n    title\n    director\n    episodeID\n  }\n"];
export function graphql(source: "\n  query filmDetailsQuery($id: ID!) {\n    film(id: $id) {\n      id\n      ...filmHeading\n      ...filmCrawl\n    }\n  }\n"): (typeof documents)["\n  query filmDetailsQuery($id: ID!) {\n    film(id: $id) {\n      id\n      ...filmHeading\n      ...filmCrawl\n    }\n  }\n"];
export function graphql(source: "\n  query allFilmsQuery {\n    allFilms {\n      films {\n        id\n        ...filmHeading\n        ...filmCrawl\n      }\n    }\n  }\n"): (typeof documents)["\n  query allFilmsQuery {\n    allFilms {\n      films {\n        id\n        ...filmHeading\n        ...filmCrawl\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;