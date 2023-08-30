import { Formik } from "formik";
import Text from "./Text";
import * as yup from 'yup';
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { POST_REVIEW } from "../graphql/queries";
import { useEffect } from "react";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  textInput: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    color: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    textAlign: 'center',
  },
});

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Repository\'s name is required'),
  ownerName: yup
    .string()
    .required('Repository owner\'s username is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0)
    .max(100),
  text: yup
    .string()
    .optional(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview, result] = useMutation(POST_REVIEW);
  
  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      createReview({
        variables: {
          review: {
            repositoryName,
            ownerName,
            rating: parseInt(rating),
            text,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (result.data) {
      navigate(`/repositories/${result.data.createReview.repositoryId}`);
    }
  }, [result.data]);
  
  return (
    <CreateReviewContainer onSubmit={onSubmit} />
  );
};

const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.textInput} name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput style={styles.textInput} name="repositoryName" placeholder="Repository name" />
      <FormikTextInput style={styles.textInput} name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput style={styles.textInput} name="text" placeholder="Review" />
      <Pressable onPress={onSubmit}>
        <Text fontWeight={'bold'} style={styles.signInButton}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;
