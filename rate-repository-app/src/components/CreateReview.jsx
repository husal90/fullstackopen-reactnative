import { View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Button from './Button';
import FormField from './FormField';
import useCreateReview from '../hooks/useCreateReview';
import theme from '../theme';

const styles = StyleSheet.create({
  form: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
    gap: 10,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string(),
});

export const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <View style={styles.form}>
      <FormField
        formik={formik}
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormField
        formik={formik}
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormField
        formik={formik}
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
      />
      <FormField formik={formik} name="text" placeholder="Review" multiline />
      <Button title="Create a review" onPress={formik.handleSubmit} />
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { repositoryId } = await createReview(values);
      navigate(`/repository/${repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
