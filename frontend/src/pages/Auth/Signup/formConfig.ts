import { StoreValue } from 'antd/lib/form/interface';
import { InternalFormInstance, RuleObject } from 'rc-field-form/lib/interface';

export enum FormItem {
  EMAIL = 'email',
  NAME = 'name',
  PASSWORD = 'password',
  CONFIRM = 'confirm',
}

export const config: Record<FormItem, any> = {
  [FormItem.NAME]: {
    name: FormItem.NAME,
    label: 'Name',
    required: true,
    rules: [{ required: true, message: 'Please input field!', whitespace: true }],
  },
  [FormItem.EMAIL]: {
    name: FormItem.EMAIL,
    label: 'E-mail',
    rules: [
      {
        type: FormItem.EMAIL,
        message: 'The email is not valid!',
      },
      {
        required: true,
        message: 'Please input your E-mail!',
      },
    ],
  },
  [FormItem.PASSWORD]: {
    name: FormItem.PASSWORD,
    label: 'Password',
    hasFeedback: true,
    rules: [
      {
        whitespace: true,
        required: true,
        message: 'Please input your password!',
      },
    ],
  },
  [FormItem.CONFIRM]: {
    name: FormItem.CONFIRM,
    label: 'Confirm Password',
    dependencies: ['password'],
    hasFeedback: true,
    rules: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
      ({ getFieldValue }: InternalFormInstance) => ({
        validator(_: RuleObject, value: StoreValue) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Passwords do not match!'));
        },
      }),
    ],
  },
};
