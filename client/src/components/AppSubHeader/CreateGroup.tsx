// External
import { FC, useState } from 'react';
// Internal
import CreateCourseModal from 'components/Modals/CreateCourseModal';
import Button from 'components/Items/Button';

const CreateCourse: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClickShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button text="create course" onClick={handleClickShowModal} />
      <CreateCourseModal visible={showModal} onCancel={handleClickShowModal} />
    </>
  );
};

export default CreateCourse;
