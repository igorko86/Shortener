import { FC } from 'react';

import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import CircleIconButton from '../../../components/CircleIconButton';
import { theme } from '../../../theme';
import CircleStop from '../../../assets/icons/CircleStop';
import PopConfirm from '../../../components/PopConfirm';
import CustomModal from '../../../components/Modals/CustomModal';

import { NavPanelSpaceAnt } from './styles';

interface IProps {
  onConfirm: (arg: boolean) => void;
  setIsPlayed: (arg: boolean) => void;
  isPlayed: boolean;
  isPause: boolean;
  setIsPause: (arg: boolean) => void;
}

const NavPanel: FC<IProps> = ({ onConfirm, setIsPlayed, isPlayed, isPause, setIsPause }) => {
  const handleClickPlay = () => {
    if (isPlayed && isPause) {
      setIsPause(false);
    } else {
      setIsPlayed(true);
    }
  };

  const handleConfirm = () => {
    setIsPlayed(false);
    setIsPause(false);
    onConfirm(true);
  };

  const handleClickPause = () => {
    setIsPause(true);
  };

  return (
    <>
      <NavPanelSpaceAnt size="small">
        <CircleIconButton
          disabled={isPlayed && !isPause}
          backgroundHover={theme.colors.dark4}
          onClick={handleClickPlay}
        >
          <PlayCircleOutlined />
        </CircleIconButton>
        <CircleIconButton
          disabled={isPause || !isPlayed}
          backgroundHover={theme.colors.dark4}
          onClick={handleClickPause}
        >
          <PauseCircleOutlined />
        </CircleIconButton>
        <PopConfirm onConfirm={handleConfirm}>
          <CircleIconButton disabled={!isPlayed} backgroundHover={theme.colors.dark4}>
            <CircleStop />
          </CircleIconButton>
        </PopConfirm>
      </NavPanelSpaceAnt>
      <CustomModal visible={isPause}></CustomModal>
    </>
  );
};

export default NavPanel;
