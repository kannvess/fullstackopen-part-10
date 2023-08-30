import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sort, searchKeyword) => {
  const order = sort === 'highest'
    ? { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
    : sort === 'lowest'
      ? { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
      : undefined;
  
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      ...order,
      searchKeyword,
    },
  });

  return !loading ? { repositories: data.repositories, loading: loading } : { repositories: [], loading: loading};
};

export default useRepositories;
