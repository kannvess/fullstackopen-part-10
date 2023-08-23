import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (result.loading) return <Text style={{position: 'absolute', top: '50%', left: '50%'}}>Loading...</Text>;

  const repositories = result.data.repositories.edges.map((edge) => edge.node).reverse();
  
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
