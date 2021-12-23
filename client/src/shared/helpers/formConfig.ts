import { StoreValue } from 'antd/lib/form/interface';
import { InternalFormInstance, RuleObject } from 'rc-field-form/lib/interface';

export enum FormItem {
  EMAIL = 'email',
  NAME = 'name',
  PASSWORD = 'password',
  CONFIRM = 'confirm',
  TITLE = 'title',
  DESCRIPTION = 'description',
  PLAN_NAME = 'planName',
  GROUP_NAME = 'groupName',
}

enum RulesType {
  REQUIRED_FILED = 'requiredFiled',
}

const rules = {
  [RulesType.REQUIRED_FILED]: [{ required: true, message: 'Please input field!', whitespace: true }],
  [FormItem.EMAIL]: [
    {
      type: FormItem.EMAIL,
      message: 'The email is not valid!',
    },
    {
      required: true,
      message: 'Please input your E-mail!',
    },
  ],
  [FormItem.PASSWORD]: [
    {
      whitespace: true,
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
    name: FormItem.NAME,
    label: 'Name',
    required: true,
    rules: rules[RulesType.REQUIRED_FILED],
  },
  [FormItem.EMAIL]: {
    name: FormItem.EMAIL,
    label: 'E-mail',
    rules: rules[FormItem.EMAIL],
  },
  [FormItem.PASSWORD]: {
    name: FormItem.PASSWORD,
    label: 'Password',
    hasFeedback: true,
    rules: rules[FormItem.PASSWORD],
  },
  [FormItem.CONFIRM]: {
    name: FormItem.CONFIRM,
    label: 'Confirm Password',
    dependencies: ['password'],
    hasFeedback: true,
    rules: rules[FormItem.CONFIRM],
  },
  [FormItem.TITLE]: {
    name: FormItem.TITLE,
    label: FormItem.TITLE,
    rules: rules[RulesType.REQUIRED_FILED],
  },
  [FormItem.DESCRIPTION]: {
    name: FormItem.DESCRIPTION,
    label: FormItem.DESCRIPTION,
    rules: rules[RulesType.REQUIRED_FILED],
  },
  [FormItem.PLAN_NAME]: {
    name: FormItem.PLAN_NAME,
    label: 'Plan name',
    rules: rules[RulesType.REQUIRED_FILED],
  },
  [FormItem.GROUP_NAME]: {
    name: FormItem.GROUP_NAME,
    label: 'Group name',
    rules: rules[RulesType.REQUIRED_FILED],
  },
};
