import { FC, useState } from 'react';
import Popover from 'antd/lib/popover';
import { Space } from 'antd';

import { PlayCircleOutlined, PauseCircleOutlined, MenuOutlined } from '@ant-design/icons';
import CircleIconButton from '../../../components/CircleIconButton';
import { theme } from '../../../theme';
import CircleStop from '../../../assets/icons/CircleStop';
import PopConfirm from '../../../components/PopConfirm';
import CustomModal from '../../../components/Modals/CustomModal';
import PopoverSelectActive from '../PopoverSelectActive';

import { NavPanelSpaceAnt } from './styles';

interface IProps {
  onConfirm: (arg: boolean) => void;
  setIsPlayed: (arg: boolean) => void;
  isPlayed: boolean;
  isPause: boolean;
  setIsPause: (arg: boolean) => void;
  showWords: object;
  setShowWords: (arg: object) => void;
}

const NavPanel: FC<IProps> = ({ onConfirm, setIsPlayed, isPlayed, setShowWords, showWords, isPause, setIsPause }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

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
        <Space size="small" direction="horizontal">
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
        </Space>
        <Popover
          content={<PopoverSelectActive setShowWords={setShowWords} showWords={showWords} />}
          title="Show"
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
          placement="bottomRight"
        >
          <MenuOutlined style={{ fontSize: '25px' }} />
        </Popover>
      </NavPanelSpaceAnt>
      <CustomModal visible={isPause}></CustomModal>
    </>
  );
};

export default NavPanel;
