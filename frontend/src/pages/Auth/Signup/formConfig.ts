import { StoreValue } from 'antd/lib/form/interface';
import { InternalFormInstance, RuleObject } from 'rc-field-form/lib/interface';
import { formFormat } from '../../../shared/regexes';

export enum FormItem {
  EMAIL = 'email',
  NAME = 'name',
  PASSWORD = 'password',
  CONFIRM = 'confirm',
}

const INPUT_FIELD_REQUIRED = 'Input field required';

export const config: Record<FormItem, any> = {
  [FormItem.NAME]: {
    name: FormItem.NAME,
    required: true,
    rules: [{ required: true, message: INPUT_FIELD_REQUIRED, whitespace: true }],
  },
  [FormItem.EMAIL]: {
    name: FormItem.EMAIL,
    rules: [
      {
        type: FormItem.EMAIL,
        message: 'Email address is invalid',
      },
      {
        required: true,
        message: INPUT_FIELD_REQUIRED,
      },
    ],
  },
  [FormItem.PASSWORD]: {
    name: FormItem.PASSWORD,
    hasFeedback: true,
    rules: [
      {
        required: true,
        message: INPUT_FIELD_REQUIRED,
      },
      () => ({
        validator(_: RuleObject, value: StoreValue) {
          if (!value || formFormat.test(value)) {
            return Promise.resolve();
          }

          return Promise.reject(new Error('At least 8 characters, 1 - uppercase, 1 - lowercase letter, 1 - number.'));
        },
      }),
    ],
  },
  [FormItem.CONFIRM]: {
    name: FormItem.CONFIRM,
    dependencies: ['password'],
    hasFeedback: true,
    rules: [
      {
        required: true,
        message: INPUT_FIELD_REQUIRED,
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
