import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  return !loading ? { repositories: data.repositories, loading: loading } : { repositories: [], loading: loading};
};

export default useRepositories;
