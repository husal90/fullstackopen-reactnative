import { TextInput, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 12,
    fontFamily: theme.fonts.main,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    color: theme.colors.error,
  },
});

const FormField = ({ formik, name, ...props }) => {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        {...props}
      />
      {error && <Text style={styles.error}>{formik.errors[name]}</Text>}
    </>
  );
};

export default FormField;
