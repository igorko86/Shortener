// External
import { FC, useState } from 'react';
// Internal
import AddStudents from '../../assets/icons/addStudent';
import Button from '../../components/Button';

const AddStudent: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClickShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button text="Add new student" type="primary" onClick={handleClickShowModal} icon={<AddStudents />} />
      {/* <AddNewStudentModal visible={showModal} onCancel={handleClickShowModal} />*/}
    </>
  );
};

export default AddStudent;
