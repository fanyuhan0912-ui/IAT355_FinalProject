import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";

import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      console.log("Trying to sign in:", email);
      console.log("Firebase Auth object:", auth);

      //Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      Alert.alert("Login successful!", `Welcome ${user.email}`);
      console.log("User logged in:", user);
      router.replace("(tabs)/home");
    } catch (error) {
      console.error("Login error:", error);
      let message = "Login failed.";
      if (error.code === "auth/invalid-email") message = "Invalid email address.";
      if (error.code === "auth/user-not-found") message = "User not found.";
      if (error.code === "auth/wrong-password") message = "Wrong password.";
      if (error.code === "auth/invalid-credential") message = "Incorrect email or password.";
      Alert.alert("Error", message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎓 UniBazaar</Text>
      <Text style={styles.subtitle}>Safe student trading within your campus</Text>

      <TextInput
        style={styles.input}
        placeholder="University Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>Don’t have an account? Sign up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2E86DE",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2E86DE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    marginTop: 20,
    color: "#2E86DE",
  },
});
