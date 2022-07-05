import { FC } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { FilterDiv, IconSpan } from './styles';

interface IProps {
  showWords: any;
  setShowWords: (arg: object) => void;
}

const PopoverSelectActive: FC<IProps> = ({ setShowWords, showWords }) => {
  const values = [
    { name: 'Show all', verbForm: 'all' },
    { name: 'Gerund', verbForm: '0' },
    { name: 'Bare infinitive', verbForm: '1' },
    { name: 'Infinitive', verbForm: '2' },
  ];

  const handleClick = (value: string) => {
    let copy: any = { ...showWords };

    if (copy[value] !== undefined) {
      if (value === 'all') {
        copy = {};
      } else {
        delete copy[value];
        delete copy.all;
      }
    } else {
      if (value === 'all') {
        copy = { all: 'all', 0: '0', 1: '1', 2: '2' };
      }
      copy[value] = value;
    }

    setShowWords({ ...copy });
  };

  return (
    <div>
      {values.map((verb) => (
        <FilterDiv key={verb.verbForm} onClick={() => handleClick(verb.verbForm)}>
          {verb.name}{' '}
          {showWords.all !== undefined || showWords[verb.verbForm] ? (
            <IconSpan>
              <CheckOutlined />
            </IconSpan>
          ) : null}
        </FilterDiv>
      ))}
    </div>
  );
};

export default PopoverSelectActive;
