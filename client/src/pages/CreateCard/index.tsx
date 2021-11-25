// External
import { FC } from 'react';
// Internal
import Editor from 'components/Editor';
import EditorForm from 'components/EditorForn';

const CreateCard: FC = () => {
  return (
    <div>
      <EditorForm>
        <Editor />
      </EditorForm>
    </div>
  );
};

export default CreateCard;
