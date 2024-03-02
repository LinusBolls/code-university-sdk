import {
  getAllEvents,
  getEventGroups,
  getMyNotifications,
  getMyUpcomingAssessments,
  getOwnSettings,
  getUnderMaintanance,
  getUpcomingEvents,
  markNotificationAsRead,
  sendForgotPasswordEmail,
  setPassword,
  signIn,
} from './general';

export const LearningPlatformRequest = {
  getAllEvents,
  getEventGroups,
  getUpcomingEvents,
  getOwnSettings,
  getUnderMaintanance,
  getMyUpcomingAssessments,
  getMyNotifications,
  markNotificationAsRead,
  sendForgotPasswordEmail,
  setPassword,
  signIn,
};
