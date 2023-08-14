import { StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
  },
  flexItemA: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'green',
  },
  flexItemB: {
    flexGrow: 1,
    backgroundColor: 'blue',
  },
});

const FlexboxExample = () => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemA}>
        <Text>Flex item A</Text>
      </View>
      <View style={styles.flexItemB}>
        <Text>Flex item B</Text>
      </View>
    </View>
  );
};

export default FlexboxExample;
