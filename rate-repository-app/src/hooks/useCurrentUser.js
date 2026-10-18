import { useQuery } from '@apollo/client/react';

import { ME } from '../graphql/queries';

const useCurrentUser = ({ includeReviews = false } = {}) => {
  const { data, ...result } = useQuery(ME, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return { user: data?.me, ...result };
};

export default useCurrentUser;
