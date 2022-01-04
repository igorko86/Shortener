// External
import { FC } from 'react';
// Internal
import Editor from 'components/Editor';

interface IProps {
  onChange?: (e: any) => void;
}
const Explanation: FC<IProps> = ({ onChange }) => {
  return <Editor onChange={onChange} />;
};

export default Explanation;
