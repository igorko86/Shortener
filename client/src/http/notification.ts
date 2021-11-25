import { notification } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';

export enum NotificationStatus {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

export const showNotificationWithIcon = (
  type: NotificationStatus,
  message: string,
  placement: NotificationPlacement = 'topLeft'
) => {
  notification[type]({
    message,
    placement,
  });
};
