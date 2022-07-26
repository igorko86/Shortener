import { FC } from 'react';
import { Popover } from 'antd';

import AvatarPopoverContent from './AvatarPopoverContent';

import { AppAvatar } from './styles';

interface IProps {
  name: string;
}

const Avatar: FC<IProps> = ({ name }) => {
  const getSurnameInitials = () => {
    const [firstName, lastName] = name.split(' ');

    return firstName && lastName ? `${firstName[0]}${lastName[0]}` : firstName[0];
  };

  return (
    <Popover content={<AvatarPopoverContent />} placement="bottomRight" trigger="click">
      <AppAvatar size="large">{getSurnameInitials()}</AppAvatar>
    </Popover>
  );
};

export default Avatar;
