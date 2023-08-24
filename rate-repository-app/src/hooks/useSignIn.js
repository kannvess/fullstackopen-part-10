import { useApolloClient, useMutation } from "@apollo/client";
import { POST_AUTHENTICATE } from "../graphql/queries";

import useAuthStorage from "./useAuthStorage";
import { useEffect } from "react";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [authenticate, result] = useMutation(POST_AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    authenticate({
      variables: { credentials: { username, password } },
    });
  };

  useEffect(() => {
    if (result.data) {
      authStorage.setAccessToken(result.data.authenticate.accessToken);
      apolloClient.resetStore();
    }
  });

  return [signIn, result];
};

export default useSignIn;
