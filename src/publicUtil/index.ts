import type * as LP from '../graphql/graphql';
import type { Mutation, Query } from '../graphql/graphql';

export type QueryRes<Key extends keyof Query> = {
  [P in Key]: Query[P];
};

export type MutationRes<Key extends keyof Mutation> = {
  [P in Key]: Mutation[P];
};
export type { LP };
