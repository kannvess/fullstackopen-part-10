import { Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  textInput: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
