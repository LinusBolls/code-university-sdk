import { GraphQLClient, gql } from 'graphql-request';

export interface RequestConfig {
  gql: typeof gql;
  fetch: typeof fetch;

  graphqlClient: GraphQLClient;
  accessToken: string;
}
