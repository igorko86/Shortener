import { FC, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AuthContext } from '../../shared/context/authContext';

const TEST = gql`
  query SayHello {
    sayHello
  }
`;

const Contact: FC = () => {
  const { user } = useContext(AuthContext);
  const { data, error } = useQuery(TEST, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  });

  return <div>Contact US</div>;
};

export default Contact;
