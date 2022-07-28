import { FC, useState } from 'react';

import Button from '../../components/Button';
import CreateCard from './CreateCard';
import GerundsInfinitives from '../../features/GerundsInfinitives';
import Modal from '../../components/Modal';

const Cards: FC = () => {
  const [isCreateCard, setIsCreateCard] = useState(false);

  const handleShowCreateCardModal = () => {
    setIsCreateCard(true);
  };

  const handleCancelCreateCardModal = () => {
    setIsCreateCard(false);
  };

  return (
    <div>
      <Button onClick={handleShowCreateCardModal}>Create Card</Button>
      <Button type="primary">Create Card</Button>

      <Modal
        visible={isCreateCard}
        // visible
        title="New Card"
        onCancel={handleCancelCreateCardModal}
        onOk={() => console.log('OK')}
        maskClosable={false}
        footer={null}
        width={1800}
      >
        <CreateCard onClose={handleCancelCreateCardModal} />
      </Modal>
      <GerundsInfinitives />
    </div>
  );
};

export default Cards;
