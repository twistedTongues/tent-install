import { SafeAreaView } from "react-native-safe-area-context";
import TentList from "../components/TentList";

const TentsNearBy = () => {
  return (
    <SafeAreaView className="flex-1 bg-violetblue">
      <TentList />
    </SafeAreaView>
  );
};

export default TentsNearBy;
