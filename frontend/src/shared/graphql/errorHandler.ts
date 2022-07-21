import { ErrorResponse } from '@apollo/client/link/error';

import { Status } from '../interfaces';
import { notificationWithIcon } from '../notification';

type IErrorData = {
  status?: Status;
  message?: string;
};

export const errorHandler = ({ graphQLErrors, operation, forward }: ErrorResponse) => {
  console.log(operation);

  if (graphQLErrors && (graphQLErrors as any)) {
    graphQLErrors.forEach(({ status, message = '' }: IErrorData) => {
      switch (status) {
        case Status.BadRequest:
          notificationWithIcon('error', message);
      }
    });
  }
};
