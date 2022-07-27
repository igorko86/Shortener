import { FC, useState } from 'react';

import Button from '../../../../components/Button';
import AddStudents from '../../../../assets/icons/addStudent';

const AddStudent: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClickShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button text="Add new student" onClick={handleClickShowModal} icon={<AddStudents />} />
    </>
  );
};

export default AddStudent;
