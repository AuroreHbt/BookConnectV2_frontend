import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Alert } from "react-native";
import FindEvents from "../components/Events/FindEvents";

export default function EventScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Affichage direct de FindEvents sans demande de permission */}
      <FindEvents />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
