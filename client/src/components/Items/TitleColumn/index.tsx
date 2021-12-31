// External
import { FC } from 'react';
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

  const handleBluer = async () => {
    if (plan.planName !== planName) {
      const result = planName || 'Plan name';

      setNewPlanName(result);
      await updatePlanName({ planId: plan.id, planName: result });
    }
  };

  return (
    <TitleColumnPosition titlePosition={titlePosition}>
      {isChange && plan ? (
        <EditableTitle title={planName} setName={setNewPlanName} handleBluer={handleBluer} />
      ) : (
        <SpanTitleColumn>{planName}</SpanTitleColumn>
      )}
    </TitleColumnPosition>
  );
};

export default TitleColumn;
