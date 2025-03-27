import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log('onRegister TOKEN:', token);
  },

  onNotification: function (notification: any) {
    // console.log('notification', notification);

    if (!notification.userInteraction) {
      PushNotification.localNotification(notification.data);
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

export const notificationSound = (item: any) => {
  console.log('item', item);

  // Create a notification channel
  PushNotification.createChannel(
    {
      channelId: 'AK47',
      channelName: 'ashish',
      channelDescription: 'A channel to categorize your notifications',
      soundName: 'default',
      importance: 4, // Importance level (0 - 4)
      vibrate: false,
      playSound: false,
    },
    (created: any) => {
      console.log(`createChannel returned '${created}'`);
    },
  );

  // Send a local notification
  PushNotification.localNotification({
    channelId: 'AK47',
    title: item.notification.title,
    message: item.notification.body,
    playSound: false,
    vibrate: false,
    onlyAlertOnce: false,
    importance: 'high',
    ignoreInForeground: false,
  });
};
