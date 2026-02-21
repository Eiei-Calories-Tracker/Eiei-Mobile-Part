import { TextInput, View } from "react-native";
import { AppText } from "../components/AppText";
import { Button } from "../components/Button";
import { useAuthStore } from "../utils/authStore";

export default function SignInScreen() {
  const { logIn, logInAsVip } = useAuthStore();

  return (
    <View className="justify-center flex-1 p-4">
      <AppText center className="text-left font-bold text-5xl">
        Sign in
      </AppText>
      <Button title="Sign in" onPress={logIn} />
      {/* <Button title="Sign in as VIP 👑" onPress={logInAsVip} /> */}
      {/* modal will access if isLoggedIn look at Layout any way I don't know why it's need to be here*/}
      {/* <Link asChild push href="/modal">
        <Button title="Open modal (disabled)" theme="secondary" />
        
      </Link> */}
      <TextInput
        placeholder="Email"
        // value={email}
        // onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      ></TextInput>
    </View>
  );
}
