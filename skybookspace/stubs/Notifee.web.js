export default {
  requestPermission: () => Promise.resolve(),
  createChannel: () => Promise.resolve(),
  displayNotification: () => Promise.resolve(),
  onForegroundEvent: () => () => {},
  onBackgroundEvent: () => {},
  getInitialNotification: () => Promise.resolve(null),
  cancelNotification: () => Promise.resolve(),
};

export const AndroidImportance = {
  HIGH: 4,
  DEFAULT: 3,
  LOW: 2,
  MIN: 1,
  NONE: 0,
};

export const EventType = {
  DISMISSED: 0,
  PRESS: 1,
  ACTION_PRESS: 2,
  DELIVERED: 3,
  APP_BLOCKED: 4,
  CHANNEL_BLOCKED: 5,
  CHANNEL_GROUP_BLOCKED: 6,
  TRIGGER_NOTIFICATION_CREATED: 7,
};