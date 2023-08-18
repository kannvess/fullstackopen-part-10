import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackgroundColor,
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab linkTo={'/'} fontWeight={'bold'} style={{ color: 'white', marginVertical: 20, marginHorizontal: 10 }}>Repositories</AppBarTab>
      <AppBarTab linkTo={'/signin'} fontWeight={'bold'} style={{ color: 'white', marginVertical: 20, marginHorizontal: 10 }}>Sign in</AppBarTab>
    </View>
  );
};

export default AppBar;
