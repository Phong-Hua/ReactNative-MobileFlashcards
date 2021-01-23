import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// Step 1: create Notification Key
const NOTIFICATION_KEY = 'MobileFlashCards:Notifications';

// Step 2: create function to clear all local notification
export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

// Step 3: create notification function
function createNotification() {
    return {
        title: 'Back to study!',
        body: "Don't forget to study and achieve your goal!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        },
        trigger: null,
    }
}

// Step 4: create set Local Notification function.
// We want to let user receive one notification per day at 6pm.
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if (status === 'granted') {
                    // If we've already established a notification, go ahead and cancel that
                    Notifications.cancelAllScheduledNotificationsAsync()

                    let tomorrow = new Date()
                    // Create an object that represent tomorrow at 6pm
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(18)
                    tomorrow.setMinutes(0)

                    Notifications.scheduleNotificationAsync(
                        createNotification(),
                        {
                            // Run it tomorrow and daily
                            time: tomorrow,
                            repeat: 'day',
                        }
                    )

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}
