import { GraphQLClient, gql } from 'graphql-request';
import { LearningPlatformClientOptions } from '.';
import { config } from '../config';

export interface RequestConfig {
  gql: typeof gql;
  fetch: typeof fetch;

  graphqlClient: GraphQLClient;
  accessToken: string;
}

export const getUnauthedRequestConfig = (
  options: LearningPlatformClientOptions | undefined
): RequestConfig => {
  const fetchImpl = options?.fetch || fetch;
  const graphqlBaseUrl = options?.graphqlBaseUrl || config.graphqlBaseUrl;

  return {
    graphqlClient: new GraphQLClient(graphqlBaseUrl, {
      fetch: fetchImpl,
    }),
    gql,
    fetch: fetchImpl,
    accessToken: null,
  };
};
