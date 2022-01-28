// External
import { FC, useEffect, useState } from 'react';
// Internal
import { useAppSelector } from './storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';
import { Role } from '../models/request/authRequest';

const useCheckAccess = (roles: Role[]): boolean => {
  const user = useAppSelector(userSelector);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (user?.role && roles.includes(user.role)) {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, [user]);

  return hasAccess;
};

export default useCheckAccess;
