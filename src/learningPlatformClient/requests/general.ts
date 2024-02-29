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

export async function getEventGroups(config: RequestConfig, offset = 0) {
  // full query: eventGroups(type: ACADEMIC, pagination: { limit: 20, offset: 20 }, filter: {}, organizing: false, attending: false)
  const query = config.gql`
  query {
    eventGroups(pagination: { offset: ${offset} }) {
      title
      type
      nextEvent {
        location
      }
    }
  }`;
  const res: { eventGroups: Query['eventGroups'] } =
    await config.graphqlClient.request(query);

  return res;
}

export async function getUpcomingEvents(config: RequestConfig) {
  const query = config.gql`
  query {
    upcomingEvents {
      title
      startTime
      endTime
      allDay
      creatorEmail
      iCalUid
      location
      host {
        name
        email
        avatarUrl
        role
      }
      eventGroup {
        title
        type
      }
      isHost
    }
  }`;
  const res: { upcomingEvents: Query['upcomingEvents'] } =
    await config.graphqlClient.request(query);

  return res;
}
