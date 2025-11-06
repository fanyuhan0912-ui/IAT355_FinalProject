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
      setMessage("注册成功！");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      setMessage("登录成功！");
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
        placeholder="输入邮箱"
      />
      <Text>Password:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="输入密码"
      />
      <Button title="注册" onPress={handleSignUp} />
      <Button title="登录" onPress={handleSignIn} />
      <Text style={{ marginTop: 20 }}>{message}</Text>
    </View>
  );
}
