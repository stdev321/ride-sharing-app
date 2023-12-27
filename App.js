import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Maps from "./src/Components/Maps/Maps";
import Login from "./src/Components/Login/Login";

export default function App() {
  return (
    <SafeAreaView >
      {/* <Maps /> */}
      <Login />
    </SafeAreaView>
  );
}
