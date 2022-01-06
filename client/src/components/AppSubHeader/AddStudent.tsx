// External
import { FC, useState } from 'react';
// Internal
import Button from 'components/Items/Button';
import AddStudents from 'shared/assets/icons/addStudent';
import AddNewStudentModal from 'components/Modals/AddNewStudent';

const AddStudent: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClickShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button text="Add new student" onClick={handleClickShowModal} icon={<AddStudents />} />
      <AddNewStudentModal visible={showModal} onCancel={handleClickShowModal} />
    </>
  );
};

export default AddStudent;
