import { MutationRes, QueryRes } from '../../publicUtil';
import { RequestConfig } from '../requestConfig';

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
  query GetEventGroups($offset: Int!) {
    eventGroups(pagination: { offset: $offset }) {
      title
      type
      nextEvent {
        location
      }
    }
  }`;
  const res = await config.graphqlClient.request<QueryRes<'eventGroups'>>(
    query,
    { offset }
  );

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

export async function sendForgotPasswordEmail(
  config: RequestConfig,
  email: string
) {
  const query = config.gql`
  mutation SendForgotPasswordEmail($email: String!) {
    forgotPassword(email: $email)
  }`;
  const res = await config.graphqlClient.request<MutationRes<'forgotPassword'>>(
    query,
    { email }
  );
  return res;
}

export async function markNotificationAsRead(
  config: RequestConfig,
  id: string
) {
  const query = config.gql`
  mutation markAsRead($id: ID!) {
    markNotificationRead(id: $id) {
      id
      __typename
    }
  }`;
  const res = await config.graphqlClient.request<
    MutationRes<'markNotificationRead'>
  >(query, { id });
  return res;
}

/**
 * only possible for users that actually have a password on their account (most users only have Google OAuth available).
 */
export async function setPassword(
  config: RequestConfig,
  newPassword: string,
  accessToken: string
) {
  const query = config.gql`
  mutation markAsRead($password: String!, $set: String!) {
    setPassword(password: $password, set: $set) {
      token
    }
  }`;
  const res = await config.graphqlClient.request<MutationRes<'setPassword'>>(
    query,
    { password: newPassword, set: accessToken }
  );
  return res;
}

/**
 * only possible for users that actually have a password on their account (most users only have Google OAuth available).
 */
export async function signIn(
  config: RequestConfig,
  email: string,
  password: string
) {
  const query = config.gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
    }
  }`;
  const res = await config.graphqlClient.request<MutationRes<'signin'>>(query, {
    email,
    password,
  });
  return res;
}

/**
 * returns a refresh token required to authenticate with the CODE Learning Platform.
 *
 * @param googleAccessToken a jwt issued by google to the learning platform
 */
export async function getLearningPlatformRefreshToken(
  config: RequestConfig,
  googleAccessToken: string
) {
  const query = config.gql`
  mutation googleSignin($code: String!) {
    googleSignin(code: $code) {
      token
      __typename
    }
  }`;
  const res = await config.graphqlClient.rawRequest<
    MutationRes<'googleSignin'>
  >(query, {
    code: googleAccessToken,
  });
  const accessToken = res.data.googleSignin!.token;

  const refreshToken = res.headers.getSetCookie()[0]?.match(/cid=(.*?);/)?.[1];

  if (!refreshToken) {
    throw new Error(
      `CodeUniversity.getLearningPlatformRefreshToken: Failed to parse refresh token from response headers: "${res.headers.getSetCookie().join('; ')}"`
    );
  }

  return {
    accessToken,
    refreshToken,
  };
}
