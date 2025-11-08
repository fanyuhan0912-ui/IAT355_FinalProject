import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView, Image } from "react-native";
import { auth, db } from "../../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default function AddScreen() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // copy GitHub Raw/Imgur link
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    // check
    if (!title.trim()) return Alert.alert("Please fill out all the text box", "Title is required");
    if (!price.trim() || isNaN(Number(price))) return Alert.alert("Please fill out all the text box", "Price is required");
    // imageUrl keep a space，Home will show it “No Image”

    try {
      setSubmitting(true);
      await addDoc(collection(db, "items"), {
        title: title.trim(),
        price: Number(price),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        sellerId: auth?.currentUser?.uid || "anon",
        createdAt: Date.now(), //need to be same sequence with the home page
      });

      setSubmitting(false);
      Alert.alert("Success", "Item posted!");
      // clear list
      setTitle("");
      setPrice("");
      setDescription("");
      setImageUrl("");
    } catch (e: any) {
      setSubmitting(false);
      console.error(e);
      Alert.alert("Error", e?.message || "Failed to post");
    }
  };

  return (
    <ScrollView contentContainerStyle={{
        paddingTop:100,
        padding: 16,
        backgroundColor: "#fff",
        flexGrow: 1
        }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Post a new item</Text>

      <Text>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="IKEA Desk"
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 6, marginBottom: 12 }}
      />

      <Text>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="e.g. 60"
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 6, marginBottom: 12 }}
      />

      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Condition, pickup location, etc."
        multiline
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, height: 90, marginTop: 6, marginBottom: 12 }}
      />

      <Text>Image URL (optional)</Text>
      <TextInput
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="https://raw.githubusercontent.com/<user>/<repo>/main/assets/images/xxx.jpg"
        autoCapitalize="none"
        autoCorrect={false}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 6, marginBottom: 12 }}
      />

      {/* view it after we add the URL） */}
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ width: "100%", height: 200, borderRadius: 12, marginBottom: 12 }} />
      ) : null}

      <Button title={submitting ? "Posting..." : "Post item"} onPress={submit} disabled={submitting} />
    </ScrollView>
  );
}
