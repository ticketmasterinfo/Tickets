// In-app notification dispatcher to avoid window.alert in iFrame
type NotificationCallback = (message: string, title?: string) => void;

let listeners: NotificationCallback[] = [];

export function showAppNotification(message: string, title = 'Ticketmaster Notice') {
  listeners.forEach(cb => cb(message, title));
}

export function subscribeToNotifications(cb: NotificationCallback) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter(l => l !== cb);
  };
}
