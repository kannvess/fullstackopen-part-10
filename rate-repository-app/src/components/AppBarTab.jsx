import { Pressable } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const AppBarTab = ({ linkTo, color, fontSize, fontWeight, style, ...props }) => {
  return (
    <Pressable>
      <Link to={linkTo}>
        <Text color={color} fontSize={fontSize} fontWeight={fontWeight} style={style} {...props} />
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
