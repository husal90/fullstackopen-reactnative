import { useState } from 'react';
import { FlatList, Pressable, TextInput, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    padding: 10,
    gap: 10,
  },
  search: {
    backgroundColor: theme.colors.itemBackground,
    borderRadius: 4,
    padding: 12,
    fontFamily: theme.fonts.main,
  },
});

const orderings = {
  latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onEndReached,
  onPressItem,
  ListHeaderComponent,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem?.(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [ordering, setOrdering] = useState('latest');
  const [keyword, setKeyword] = useState('');
  const [searchKeyword] = useDebounce(keyword, 500);
  const navigate = useNavigate();

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    searchKeyword,
    ...orderings[ordering],
  });

  const header = (
    <View style={styles.header}>
      <TextInput
        style={styles.search}
        placeholder="Filter repositories"
        value={keyword}
        onChangeText={setKeyword}
      />
      <Picker selectedValue={ordering} onValueChange={setOrdering}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReached={fetchMore}
      onPressItem={(id) => navigate(`/repository/${id}`)}
      ListHeaderComponent={header}
    />
  );
};

export default RepositoryList;
