import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sort, setSort] = useState();
  const { repositories, loading } = useRepositories(sort);
  
  return <RepositoryListContainer sort={sort} setSort={setSort} repositories={repositories} loading={loading} />;
};

export const RepositoryListContainer = ({ repositories, loading, sort, setSort }) => {
  if (loading) return <Text style={{ position: 'absolute', top: '50%', left: '50%' }}>loading...</Text>;

  const repositoryNodes = repositories
  ? repositories.edges.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue) => setSort(itemValue)}
        >
          <Picker.Item color={theme.colors.textSecondary} label='Select an item...' enabled={false} />
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      }
    />
  );
};

export default RepositoryList;
