import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Result } from 'antd';
import jwt from 'jwt-decode';

import { AppPagePath } from '../../AppPagePath';
import Loader from '../../../components/Loader';
import { useActivateMutation } from '../../../shared/graphql/auth/useAuthMutations';

const Activate: FC = () => {
  const { id: hash } = useParams<{ id: string }>();
  const [userId, setUserId] = useState('');
  const [activate, { loading, error }] = useActivateMutation();

  useEffect(() => {
    if (hash) {
      const jwtData = jwt<{ id: string }>(hash);

      if (jwtData.id) {
        setUserId(jwtData.id);
      }
    }
  }, [hash]);

  useEffect(() => {
    if (userId) {
      activate({
        variables: {
          activateId: userId,
        },
      });
    }
  }, [userId]);

  if (!userId || loading) {
    return <Loader />;
  }

  if (error) {
    return <Result status="500" title="Something went wrong." />;
  }

  return (
    <>
      <Result
        status="success"
        title="Successfully!"
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
