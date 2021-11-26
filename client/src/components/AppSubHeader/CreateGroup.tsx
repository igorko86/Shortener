// External
import { FC, useState } from 'react';
// Internal
import CreateGroupModal from 'components/Modals/CreateGroupModal';
import Button from 'components/Items/Button';

const CreateGroup: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClickShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button text="create plan" onClick={handleClickShowModal} />
      <CreateGroupModal visible={showModal} onCancel={handleClickShowModal} />
    </>
  );
};

export default CreateGroup;
