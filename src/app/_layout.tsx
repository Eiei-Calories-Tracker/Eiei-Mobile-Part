import "../../global.css";
import SaveAreaScreen from "../components/SaveAreaScreen";

import { Slot } from "expo-router";
// SafeAreaView is option
export default function Layout() {
  return (
    <SaveAreaScreen>
      <Slot />
    </SaveAreaScreen>
  );
}
