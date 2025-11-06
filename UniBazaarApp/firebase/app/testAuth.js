import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { signIn, signUp } from "../firebase/auth";

export default function TestAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      setMessage("Sign In Successful！");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      setMessage("Login Successful！");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text>Email:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        value={email}
        onChangeText={setEmail}
        placeholder="Text your Email"
      />
      <Text>Password:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Text your Password"
      />
      <Button title="Sign In" onPress={handleSignUp} />
      <Button title="Login" onPress={handleSignIn} />
      <Text style={{ marginTop: 20 }}>{message}</Text>
    </View>
  );
}
