import { FC } from 'react';

import { AppPagePath } from '../../../AppPagePath';
import { activeItem } from '../helper';

import { NavLink, SubHeaderDiv } from './styles';

const SubHeader: FC = () => {
  return (
    <SubHeaderDiv>
      <NavLink className={activeItem} to={`/${AppPagePath.CARDS}`}>
        Cards
      </NavLink>
      <NavLink className={activeItem} to={`/${AppPagePath.INFORMATION}`}>
        Information
      </NavLink>
      <NavLink className={activeItem} to={`/${AppPagePath.STUDENTS}`}>
        Students
      </NavLink>
      <NavLink className={activeItem} to={`/${AppPagePath.INFORMATION}`}>
        Plans
      </NavLink>
    </SubHeaderDiv>
  );
};

export default SubHeader;
