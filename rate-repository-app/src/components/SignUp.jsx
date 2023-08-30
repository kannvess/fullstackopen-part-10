import { useMutation } from "@apollo/client";
import Text from "./Text";
import * as yup from 'yup';
import { POST_USER } from "../graphql/queries";
import { useEffect } from "react";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";

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
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must have at least 5 characters')
    .max(30, 'Username must have at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must have at least 5 characters')
    .max(30, 'Password must have at most 30 characters'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Password doesn\'t match')
    .required('Password confirmation is required')
    .min(5, 'Password confirmation must have at least 5 characters')
    .max(30, 'Password confirmation must have at most 30 characters'),
});

const SignUp = () => {
  const [createUser, result] = useMutation(POST_USER);
  const [signIn, signInResult] = useSignIn();
  const navigate = useNavigate();
  
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }

    if (result.data) {
      try {
        signIn({ username, password });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (signInResult.data) {
      navigate('/');
    }
  }, [signInResult.data]);
  
  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.textInput} name="username" placeholder="Username" />
      <FormikTextInput style={styles.textInput} name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput style={styles.textInput} name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry />
      <Pressable onPress={onSubmit}>
        <Text fontWeight={'bold'} style={styles.signInButton}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
