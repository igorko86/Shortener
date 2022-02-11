// External
import { FC, memo, useEffect, useState } from 'react';
import { Table, Tag, Transfer } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// Internal
import LibraryService from 'shared/services/LibraryService';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';
import { exercisesSelector } from 'store/reducers/library/selectors';
import { IExercise } from 'store/reducers/library/types';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import useDebounce from 'shared/hooks/useDebaunce';
import { TabName } from '../../helper';
// Styles
import { DivWrapperLayout } from '../styles';

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];

const getRightTableColumns = (onItemRemove: ((keys: string[]) => void) | undefined, setTargetKeys: any) => {
  return [
    {
      dataIndex: 'title',
      title: 'Name',
    },
    {
      dataIndex: 'tag',
      title: 'Tag',
    },
    {
      dataIndex: 'description',
      title: 'Description',
    },
    {
      title: (
        <>
          <span>Action </span>
          <DeleteOutlined onClick={() => setTargetKeys([])} />
        </>
      ),
      dataIndex: '',
      key: 'x',
      render: (text: { key: string; title: string; description: string; disabled: boolean; tag: string }) => {
        return (
          <DeleteOutlined
            onClick={() => {
              if (onItemRemove) {
                onItemRemove([text.key]);
              }
            }}
          />
        );
      },
    },
  ];
};

interface IProps {
  visible: boolean;
  creatingNewCard: boolean;
  activeTab: TabName;
}

const TableTransfer: FC<IProps> = ({ visible, creatingNewCard, activeTab }) => {
  const user = useAppSelector(userSelector);
  const newExercise = useAppSelector(exercisesSelector);
  const [searchValue, setSearchValue] = useState('');

  const { setNewExerciseIds } = useActionCreator();
  const debouncedValue = useDebounce(searchValue.trim(), 300);

  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);

    setNewExerciseIds(nextTargetKeys);

    if (selectedKeys.length) {
      setSelectedKeys([]);
    }
  };

  const onSelectRowsChange = (sourceSelectedKeys: any[]) => {
    setSelectedKeys([...sourceSelectedKeys]);
  };

  useEffect(() => {
    if (creatingNewCard) {
      setTargetKeys([]);
      setExercises([]);
      setSelectedKeys([]);
    }
  }, [creatingNewCard]);

  useEffect(() => {
    if (user && activeTab === TabName.Exercises) {
      LibraryService.geExercisesByUserId(user.id, debouncedValue)
        .then((data) => {
          const exercises = data.map((item) => {
            const { id, name, type, exerciseType } = item;

            return {
              key: id,
              title: name,
              disabled: false,
              tag: type,
              exerciseType,
            };
          });

          setExercises(exercises);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [activeTab, debouncedValue]);

  useEffect(() => {
    if (newExercise) {
      setExercises([...exercises, newExercise]);
      setTargetKeys([...targetKeys, newExercise.key]);
    }
  }, [newExercise]);

  const handleSearch = (direction: string, value: string) => {
    if (direction === 'left') {
      setSearchValue(value);
    }
  };

  return visible ? (
    <DivWrapperLayout>
      <Transfer
        showSelectAll={false}
        dataSource={exercises}
        disabled={false}
        showSearch
        filterOption={(inputValue, item) =>
          item.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
          item.tag.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        }
        oneWay
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        locale={{ searchPlaceholder: 'Search by name or tag' }}
        onSearch={handleSearch}
      >
        {({
          direction,
          filteredItems,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
          onItemRemove,
        }) => {
          const columns = direction === 'left' ? leftTableColumns : getRightTableColumns(onItemRemove, onChange);

          const rowSelection = {
            getCheckboxProps: (item: { key: string; title: string; disabled: boolean; tag: string }) => ({
              disabled: listDisabled || item.disabled,
            }),
            selectedRowKeys: listSelectedKeys,
            onChange: direction === 'left' ? onSelectRowsChange : undefined,
          };

          return (
            <Table
              pagination={false}
              scroll={{ y: 300 }}
              rowSelection={direction === 'left' ? rowSelection : undefined}
              columns={columns}
              dataSource={filteredItems}
              size="small"
              style={{ pointerEvents: listDisabled ? 'none' : undefined }}
              onRow={(data) => {
                const { key, disabled: itemDisabled } = data;

                return {
                  onClick: () => {
                    if (itemDisabled || listDisabled) return;
                    onItemSelect(key, !listSelectedKeys.includes(key));
                  },
                };
              }}
            />
          );
        }}
      </Transfer>
    </DivWrapperLayout>
  ) : null;
};

export default memo(TableTransfer);
