import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import theme from '../theme';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sort, setSort] = useState();
  const [search, setSearch] = useState();
  const [searchValue] = useDebounce(search, 1000);
  const { repositories, loading, fetchMore } = useRepositories(sort, searchValue);

  const onEndReach = () => {
    fetchMore();
  };
  
  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      sort={sort}
      setSort={setSort}
      loading={loading}
      search={search}
      setSearch={setSearch}
    />
  );
};

export const RepositoryListContainer = ({ repositories, onEndReach, loading, sort, setSort, search, setSearch }) => {
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
        <>
          <Searchbar
            placeholder='Search for repositories'
            onChangeText={(query) => setSearch(query)}
            value={search}
          />
          <Picker
            selectedValue={sort}
            onValueChange={(itemValue) => setSort(itemValue)}
          >
            <Picker.Item color={theme.colors.textSecondary} label='Select an item...' enabled={false} />
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highest" />
            <Picker.Item label="Lowest rated repositories" value="lowest" />
          </Picker>
        </>
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryList;
