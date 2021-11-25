import React, { useState } from 'react';
import { Button } from 'antd';

import CreateGroupModal from 'components/Modals/CreateGroupModal';

const CreateGroup = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClickShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleClickShowModal}>create plan</Button>
      <CreateGroupModal visible={showModal} onCancel={handleClickShowModal} />
    </>
  );
};

export default CreateGroup;
