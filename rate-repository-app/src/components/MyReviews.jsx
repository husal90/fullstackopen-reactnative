import { Alert, FlatList, Platform, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';

import Button from './Button';
import ReviewItem from './ReviewItem';
import useCurrentUser from '../hooks/useCurrentUser';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  action: {
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// Alert.alert shows nothing on web, so fall back to window.confirm there
const confirmDelete = (onConfirm) => {
  if (Platform.OS === 'web') {
    if (window.confirm('Delete this review?')) onConfirm();
    return;
  }

  Alert.alert(
    'Delete review',
    'Are you sure you want to delete this review?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onConfirm },
    ],
  );
};

const MyReviews = () => {
  const { user, refetch } = useCurrentUser({ includeReviews: true });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const reviews = user?.reviews?.edges.map((edge) => edge.node) ?? [];

  const handleDelete = (id) =>
    confirmDelete(async () => {
      await deleteReview({ variables: { id } });
      refetch();
    });

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} title={item.repository.fullName}>
          <View style={styles.actions}>
            <Button
              style={styles.action}
              title="View repository"
              onPress={() => navigate(`/repository/${item.repositoryId}`)}
            />
            <Button
              style={styles.action}
              danger
              title="Delete review"
              onPress={() => handleDelete(item.id)}
            />
          </View>
        </ReviewItem>
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
