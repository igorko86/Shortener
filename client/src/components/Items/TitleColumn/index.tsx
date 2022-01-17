// External
import { FC, useState } from 'react';
// Internal
import { useActionCreator } from 'shared/hooks/useActionCreator';
import EditableTitle from '../EditableTitle';
// Styles
import { SpanTitleColumn, TitleColumnPosition } from './styles';

interface IProps {
  title: string;
  previousTitle?: any;
  titlePosition?: string;
  isChange?: boolean;
  setNewPlanName?: any;
  plan?: any;
}

const TitleColumn: FC<IProps> = ({ title, plan, titlePosition, isChange, setNewPlanName }) => {
  const { updatePlanName } = useActionCreator();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleBluer = async () => {
    if (plan.planName !== title) {
      const result = title || 'Plan name';

      setNewPlanName(result);
      await updatePlanName({ planId: plan.id, planName: result });
    }
    setIsDisabled(true);
  };

  return (
    <TitleColumnPosition titlePosition={titlePosition}>
      {isChange && plan ? (
        <EditableTitle
          title={title}
          setName={setNewPlanName}
          handleBluer={handleBluer}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        />
      ) : (
        <SpanTitleColumn>{title}</SpanTitleColumn>
      )}
    </TitleColumnPosition>
  );
};

export default TitleColumn;
