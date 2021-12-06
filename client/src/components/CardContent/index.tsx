// External
import { FC } from 'react';
import DOMPurify from 'dompurify';
import { CloseCircleFilled } from '@ant-design/icons';
// Internal
import { useAppDispatch, useAppSelector } from 'shared/hooks/storeHooks';
import { cardContentSelector } from 'store/reducers/library/selectors';
import { libraryActions } from 'store/reducers/library/actionCreators';
// Styles

const { setCardContent } = libraryActions;

const CardContent: FC = () => {
  const cardContent = useAppSelector(cardContentSelector);
  const dispatch = useAppDispatch();

  const createMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const handleClose = () => {
    dispatch(setCardContent(null));
  };
  return cardContent ? (
    <div>
      <CloseCircleFilled onClick={handleClose} />
      <div dangerouslySetInnerHTML={createMarkup(cardContent)} />
    </div>
  ) : (
    <div>
      <div style={{ width: '100%' }}>Default CardContent</div>
    </div>
  );
};

export default CardContent;
