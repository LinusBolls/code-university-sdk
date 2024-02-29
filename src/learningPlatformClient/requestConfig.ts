import { GraphQLClient, gql } from 'graphql-request';

export interface RequestConfig {
  gql: typeof gql;
  graphqlClient: GraphQLClient;
}
