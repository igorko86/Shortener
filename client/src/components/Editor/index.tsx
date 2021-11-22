// External
import { FC } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    [{ size: [] }],
    [{ color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    [{ font: [] }],
    [{ align: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
  },
};

interface IProps {
  onChange?: (e: any) => void;
}
const Editor: FC<IProps> = ({ onChange }) => {
  return <ReactQuill modules={modules} theme="snow" onChange={onChange} placeholder="Content goes here..." />;
};

export default Editor;
