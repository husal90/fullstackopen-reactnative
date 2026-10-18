import { View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Button from './Button';
import FormField from './FormField';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

const styles = StyleSheet.create({
  form: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
    gap: 10,
  },
});

const initialValues = { username: '', password: '' };

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
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
      <Button title="Sign in" onPress={formik.handleSubmit} />
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
