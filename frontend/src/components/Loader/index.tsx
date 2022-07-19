import { FC } from 'react';
import { DivLoader, DivSkCircle } from './styles';

interface IProps {
  position?: 'fixed' | 'static' | 'absolute' | 'relative';
  isPointerEvent?: boolean;
}

const Loader: FC<IProps> = ({ position = 'fixed', isPointerEvent = false }) => {
  return (
    <>
      <DivLoader position={position} $isPointerEvent={isPointerEvent}>
        <DivSkCircle>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </DivSkCircle>
      </DivLoader>
    </>
  );
};

export default Loader;
