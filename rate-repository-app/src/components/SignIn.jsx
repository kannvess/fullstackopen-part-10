import { Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from 'yup';

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
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.textInput} name="username" placeholder="Username" />
      <FormikTextInput style={styles.textInput} name="password" placeholder="Password" secureTextEntry={true} />
      <Pressable onPress={onSubmit}>
        <Text fontWeight={'bold'} style={styles.signInButton}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
