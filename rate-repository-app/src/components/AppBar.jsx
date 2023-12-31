import { StyleSheet, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from '../theme';
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackgroundColor,
    flexDirection: 'row',
  },
});


const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  
  const me = useQuery(GET_ME);

  const signout = async () => {
    navigate('/');
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab linkTo={'/'} fontWeight={'bold'} style={{ color: 'white', marginVertical: 20, marginHorizontal: 10 }}>Repositories</AppBarTab>
        {!me.loading && !me.data.me
          ? <>
              <AppBarTab linkTo={'/signin'} fontWeight={'bold'} style={{ color: 'white', marginVertical: 20, marginHorizontal: 10 }}>Sign in</AppBarTab>
              <AppBarTab linkTo={'/signup'} fontWeight={'bold'} style={{ color: 'white', marginVertical: 20, marginHorizontal: 10 }}>Sign up</AppBarTab>
            </>
          : <>
              <AppBarTab linkTo={'/create_review'} fontWeight={'bold'} style={{ color: 'white', marginVertical: 20, marginHorizontal: 10 }}>Create a review</AppBarTab>
              <AppBarTab linkTo={'/my_reviews'} fontWeight={'bold'} style={{ color: 'white', marginVertical: 20, marginHorizontal: 10 }}>My reviews</AppBarTab>
              <AppBarTab
                onPress={signout}
                fontWeight={'bold'}
                style={{ color: 'white', marginVertical: 20, marginHorizontal: 10 }}
              >Sign out</AppBarTab>
            </>
        }
        {/* <AppBarTab linkTo={'/signin'} fontWeight={'bold'} style={{ color: 'white', marginVertical: 20, marginHorizontal: 10 }}>Sign in</AppBarTab>
        <AppBarTab
          onPress={signout}
          fontWeight={'bold'}
          style={{ color: 'white', marginVertical: 20, marginHorizontal: 10 }}
        >Sign out</AppBarTab> */}
      </ScrollView>
    </View>
  );
};

export default AppBar;
