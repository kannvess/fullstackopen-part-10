import { useMutation } from "@apollo/client";
import { POST_AUTHENTICATE } from "../graphql/queries";

const useSignIn = () => {
  const [authenticate, result] = useMutation(POST_AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    authenticate({
      variables: { credentials: { username, password } },
    });
  };

  return [signIn, result];
};

export default useSignIn;
