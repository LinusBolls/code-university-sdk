import { Query } from '../../graphql/graphql';
import { RequestConfig } from '../requestConfig';

type QueryRes<Key extends keyof Query> = {
  [P in Key]: Query[P];
};

export async function getAllEvents(config: RequestConfig) {
  const query = config.gql`
  query {
    events {
      title
    }
  }`;
  const res = await config.graphqlClient.request<QueryRes<'events'>>(query);

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
  }`;
  const res = await config.graphqlClient.request<QueryRes<'mySettings'>>(query);

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
  const res =
    await config.graphqlClient.request<QueryRes<'eventGroups'>>(query);

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
  const res =
    await config.graphqlClient.request<QueryRes<'upcomingEvents'>>(query);

  return res;
}

export async function getUnderMaintanance(config: RequestConfig) {
  const query = config.gql`
  query {
    underMaintanance
  }`;
  const res =
    await config.graphqlClient.request<QueryRes<'underMaintanance'>>(query);

  return res;
}

export async function getMyUpcomingAssessments(config: RequestConfig) {
  const query = config.gql`
  query {
    myUpcomingAssessments {
      event {
        title
        location
      }
    }
  }`;
  const res =
    await config.graphqlClient.request<QueryRes<'myUpcomingAssessments'>>(
      query
    );

  return res;
}

export async function getMyNotifications(config: RequestConfig) {
  const query = config.gql`
  query {
    myNotifications {
      title
      label
      link
      read
      urgency
      createdAt
    }
  }`;
  const res =
    await config.graphqlClient.request<QueryRes<'myNotifications'>>(query);

  return res;
}
