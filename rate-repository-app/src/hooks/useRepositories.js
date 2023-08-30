import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sort, searchKeyword) => {
  const order = sort === 'highest'
    ? { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
    : sort === 'lowest'
      ? { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
      : undefined;
  
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      ...order,
      searchKeyword,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...order,
        searchKeyword,
      },
    });
  };

  return !loading ? { repositories: data.repositories, fetchMore: handleFetchMore, loading: loading } : { repositories: [], loading: loading};
};

export default useRepositories;
