import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
    gap: 15,
  },
  review: {
    flexDirection: 'row',
    gap: 15,
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexShrink: 1,
    gap: 5,
  },
});

// `title` is the reviewer's name, or the repository name in "my reviews"; `children` holds actions
const ReviewItem = ({ review, title, children }) => (
  <View style={styles.container}>
    <View style={styles.review}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.content}>
        <Text fontWeight="bold">{title}</Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'dd MMM yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
    {children}
  </View>
);

export default ReviewItem;
