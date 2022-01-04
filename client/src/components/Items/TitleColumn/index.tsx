// External
import { FC, useState } from 'react';
// Internal
import { useActionCreator } from 'shared/hooks/useActionCreator';
import EditableTitle from '../EditableTitle';
// Styles
import { SpanTitleColumn, TitleColumnPosition } from './styles';

interface IProps {
  planName: string;
  previousTitle?: any;
  titlePosition?: string;
  isChange?: boolean;
  setNewPlanName?: any;
  plan?: any;
}

const TitleColumn: FC<IProps> = ({ planName, plan, titlePosition, isChange, setNewPlanName }) => {
  const { updatePlanName } = useActionCreator();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleBluer = async () => {
    if (plan.planName !== planName) {
      const result = planName || 'Plan name';

      setNewPlanName(result);
      await updatePlanName({ planId: plan.id, planName: result });
    }
    setIsDisabled(true);
  };

  return (
    <TitleColumnPosition titlePosition={titlePosition}>
      {isChange && plan ? (
        <EditableTitle
          title={planName}
          setName={setNewPlanName}
          handleBluer={handleBluer}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        />
      ) : (
        <SpanTitleColumn>{planName}</SpanTitleColumn>
      )}
    </TitleColumnPosition>
  );
};

export default TitleColumn;
