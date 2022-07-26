// External
import { useEffect, useState } from 'react';
// Internal

const useCheckAccess = (roles: any[]): boolean => {
  const user = {} as any;
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
