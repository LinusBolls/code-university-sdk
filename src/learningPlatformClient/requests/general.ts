import { Query } from '../../graphql/graphql';
import { RequestConfig } from '../requestConfig';

export async function getAllEvents(config: RequestConfig) {
  const query = config.gql`
      query {
        events {
          title
        }
      }
    `;
  const res: { events: Query['events'] } =
    await config.graphqlClient.request(query);

  return res;
}

export async function getOwnSettings(config: RequestConfig) {
  const query = config.gql`
        query {
          mySettings {
            id
            assessmentEmailsEnabled
            consultationCapacity
          }
        }
      `;
  const res: { mySettings: Query['mySettings'] } =
    await config.graphqlClient.request(query);

  return res;
}
