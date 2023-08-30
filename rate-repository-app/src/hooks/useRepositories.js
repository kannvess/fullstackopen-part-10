import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sort) => {
  const variables = sort === 'highest'
    ? { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
    : sort === 'lowest'
      ? { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
      : undefined;
  
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return !loading ? { repositories: data.repositories, loading: loading } : { repositories: [], loading: loading};
};

export default useRepositories;
