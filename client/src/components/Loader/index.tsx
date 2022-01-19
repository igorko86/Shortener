import { FC } from 'react';
import { DivLoader, DivSkCircle } from './styles';

interface IProps {
  position?: 'fixed' | 'static' | 'absolute' | 'relative';
}

const Loader: FC<IProps> = ({ position = 'fixed' }) => {
  return (
    <>
      <DivLoader position={position}>
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
