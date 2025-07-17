import {  View } from "react-native";
import { useTheme} from "../../../hooks";
import { CalmingText } from "../CalmingMode/CalmingText";

export const Home = () => {
  const { theme } = useTheme();
  return (
    <View style={{ color: theme.text }}>
      {
        (theme.mode==="calming") && <CalmingText/>
      }
    </View>
  );
};
