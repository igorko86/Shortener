// External
import { FC, useState } from 'react';
// Internal
import Button from 'components/Items/Button';
import AddStudentModal from '../Modals/AddStudentModal';
import AddStudents from '../../shared/assets/icons/addStudent';

const AddStudent: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClickShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button text="Add new student" onClick={handleClickShowModal} icon={<AddStudents />} />
      <AddStudentModal visible={showModal} onCancel={handleClickShowModal} />
    </>
  );
};

export default AddStudent;
