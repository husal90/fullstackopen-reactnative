import { View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Button from './Button';
import FormField from './FormField';
import useSignUp from '../hooks/useSignUp';
import theme from '../theme';

const styles = StyleSheet.create({
  form: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
    gap: 10,
  },
});

const initialValues = { username: '', password: '', passwordConfirmation: '' };

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Password confirmation does not match')
    .required('Password confirmation is required'),
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <View style={styles.form}>
      <FormField formik={formik} name="username" placeholder="Username" />
      <FormField
        formik={formik}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <FormField
        formik={formik}
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Button title="Sign up" onPress={formik.handleSubmit} />
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      await signUp({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
