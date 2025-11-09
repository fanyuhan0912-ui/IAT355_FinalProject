import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { router } from "expo-router";

export default function ProfileScreen() {

  const user = auth.currentUser;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 16,
        }}
      >
        Profile
      </Text>


      <Text
        style={{
          fontSize: 16,
          color: "#333",
          marginBottom: 40,
        }}
      >
        {user ? `Logged in as: ${user.email}` : "No user logged in"}
      </Text>


      <TouchableOpacity
        onPress={async () => {
          try {
            await signOut(auth);
            router.replace("/login");
          } catch (error) {
            console.error("Logout error:", error);
          }
        }}
        activeOpacity={0.8}
        style={{
          backgroundColor: "#007bff",
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
