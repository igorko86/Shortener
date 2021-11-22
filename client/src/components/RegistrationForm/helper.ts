import { StoreValue } from 'antd/lib/form/interface';
import { InternalFormInstance, RuleObject } from 'rc-field-form/lib/interface';

export enum FormItem {
  EMAIL = 'email',
  NAME = 'name',
  PASSWORD = 'password',
  CONFIRM = 'confirm',
}

const rules = {
  [FormItem.NAME]: [{ required: true, message: 'Please input your name of the Tutor!', whitespace: true }],
  [FormItem.EMAIL]: [
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
    {
      required: true,
      message: 'Please input your E-mail!',
    },
  ],
  [FormItem.PASSWORD]: [
    {
      required: true,
      message: 'Please input your password!',
    },
  ],
  [FormItem.CONFIRM]: [
    {
      required: true,
      message: 'Please confirm your password!',
    },
    ({ getFieldValue }: InternalFormInstance) => ({
      validator(_: RuleObject, value: StoreValue) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('The two passwords that you entered do not match!'));
      },
    }),
  ],
};

export const config: Record<FormItem, any> = {
  [FormItem.NAME]: {
    name: 'companyName',
    label: 'Tutor Name',
    tooltip: 'What do you want others to call you?',
    required: true,
    rules: rules[FormItem.NAME],
  },
  [FormItem.EMAIL]: {
    name: 'email',
    label: 'E-mail',
    rules: rules[FormItem.EMAIL],
  },
  [FormItem.PASSWORD]: {
    name: 'password',
    label: 'Password',
    hasFeedback: true,
    rules: rules[FormItem.PASSWORD],
  },
  [FormItem.CONFIRM]: {
    name: 'confirm',
    label: 'Confirm Password',
    dependencies: ['password'],
    hasFeedback: true,
    rules: rules[FormItem.CONFIRM],
  },
};
