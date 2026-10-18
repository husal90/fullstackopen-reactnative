import { Pressable, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
  },
  danger: {
    backgroundColor: theme.colors.error,
  },
});

const Button = ({ title, danger, style, ...props }) => (
  <Pressable style={[styles.button, danger && styles.danger, style]} {...props}>
    <Text color="light" fontWeight="bold">
      {title}
    </Text>
  </Pressable>
);

export default Button;
