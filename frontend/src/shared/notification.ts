import { notification } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const notificationWithIcon = (type: NotificationType, message: string, placement?: NotificationPlacement) => {
  notification[type]({
    message: message,
    placement: placement || 'topRight',
    top: 200,
  });
};
