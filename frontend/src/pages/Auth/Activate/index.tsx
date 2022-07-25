import { FC } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Result } from 'antd';

import { AppPagePath } from '../../AppPagePath';
import Loader from '../../../components/Loader';
import { useActivateQuery } from '../../../shared/graphql/auth/useAuthQueries';

const Activate: FC = () => {
  const [searchParams] = useSearchParams();
  const { loading, error } = useActivateQuery(searchParams.get('id') || '');

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Result status="500" title="Something went wrong." />;
  }

  return (
    <>
      <Result
        status="success"
        title="Successfully !"
        subTitle={
          <>
            Your account is activated! <Link to={`/${AppPagePath.SIGNIN}`}>Sign In</Link>{' '}
          </>
        }
      />
    </>
  );
};

export default Activate;
