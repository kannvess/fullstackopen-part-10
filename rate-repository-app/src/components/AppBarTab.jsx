import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({ color, fontSize, fontWeight, style, ...props }) => {
  return (
    <Pressable>
      <Text color={color} fontSize={fontSize} fontWeight={fontWeight} style={style} {...props} />
    </Pressable>
  );
};

export default AppBarTab;
