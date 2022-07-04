import { FC, useState } from 'react';

import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import CircleIconButton from '../../../components/CircleIconButton';
import { theme } from '../../../theme';
import CircleStop from '../../../assets/icons/CircleStop';
import Popconfirm from '../../../components/PopConfirm';

import { NavPanelSpaceAnt } from './styles';
import CustomModal from '../../../components/Modals/CustomModal';

interface IProps {
  onConfirm: (arg: boolean) => void;
  setIsPlayed: (arg: boolean) => void;
  isPlayed: boolean;
}

const NavPanel: FC<IProps> = ({ onConfirm, setIsPlayed, isPlayed }) => {
  const [isPause, setIsPause] = useState(false);

  const handleClickPlay = () => {
    setIsPlayed(true);
  };

  const handleConfirm = () => {
    setIsPlayed(false);
    onConfirm(true);
  };

  const handleClickPause = () => {
    setIsPause((prev) => true);
  };

  return (
    <>
      <NavPanelSpaceAnt size="small">
        <CircleIconButton disabled={isPlayed} backgroundHover={theme.colors.dark4} onClick={handleClickPlay}>
          <PlayCircleOutlined />
        </CircleIconButton>
        <CircleIconButton backgroundHover={theme.colors.dark4} onClick={handleClickPause}>
          <PauseCircleOutlined />
        </CircleIconButton>
        <Popconfirm onConfirm={handleConfirm}>
          <CircleIconButton disabled={!isPlayed} backgroundHover={theme.colors.dark4}>
            <CircleStop />
          </CircleIconButton>
        </Popconfirm>
      </NavPanelSpaceAnt>
      <CustomModal visible={isPause}></CustomModal>
    </>
  );
};

export default NavPanel;
