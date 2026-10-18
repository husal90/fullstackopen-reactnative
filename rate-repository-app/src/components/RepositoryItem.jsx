import { View, Image, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

import Button from './Button';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
    gap: 15,
  },
  header: {
    flexDirection: 'row',
    gap: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  info: {
    flexShrink: 1,
    alignItems: 'flex-start',
    gap: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    gap: 3,
  },
});

const formatCount = (count) =>
  count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text fontWeight="bold">{formatCount(value)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ item, showGitHubButton }) => (
  <View style={styles.container} testID="repositoryItem">
    <View style={styles.header}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.info}>
        <Text fontWeight="bold" fontSize="subheading">
          {item.fullName}
        </Text>
        <Text color="textSecondary">{item.description}</Text>
        <View style={styles.language}>
          <Text color="light">{item.language}</Text>
        </View>
      </View>
    </View>
    <View style={styles.stats}>
      <Stat label="Stars" value={item.stargazersCount} />
      <Stat label="Forks" value={item.forksCount} />
      <Stat label="Reviews" value={item.reviewCount} />
      <Stat label="Rating" value={item.ratingAverage} />
    </View>
    {showGitHubButton && (
      <Button
        title="Open in GitHub"
        onPress={() => Linking.openURL(item.url)}
      />
    )}
  </View>
);

export default RepositoryItem;
