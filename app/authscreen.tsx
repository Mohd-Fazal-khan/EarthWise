import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../firebase/firebaseconfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import NetInfo from "@react-native-community/netinfo";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

// Helpers
const wp = (percentage) => (width * percentage) / 100; // width percentage
const hp = (percentage) => (height * percentage) / 100; // height percentage
const fs = (size) => Math.round(size * (width / 375));

export default function AuthScreen({
  setIsLoggedIn,
}: {
  setIsLoggedIn?: (val: boolean) => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    setError("");
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      Alert.alert(
        "No Internet",
        "Please check your internet connection and try again."
      );
      return;
    }
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      setIsLoggedIn && setIsLoggedIn(true);
     router.replace('/home')
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.tabinactive}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.tabinactive}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <LinearGradient
            colors={["#235c36", "#9b6c4b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>
              {isLogin ? "Login" : "Sign Up"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.switch} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp(5),
    backgroundColor: Colors.white,
  },
  card: {
    backgroundColor: Colors.body,
    borderRadius: wp(4),
    padding: wp(5),
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: fs(26),
    fontWeight: "bold",
    marginBottom: hp(3),
    textAlign: "center",
    color: Colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    borderRadius: wp(3),
    backgroundColor: Colors.white,
    fontSize: fs(16),
    color: Colors.text,
  },
  error: {
    color: Colors.red,
    marginBottom: hp(1.5),
    textAlign: "center",
    fontSize: fs(14),
  },
  button: {
    borderRadius: wp(3),
    overflow: "hidden",
    marginTop: hp(1),
  },
  gradient: {
    paddingVertical: hp(1.8),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(3),
  },
  buttonText: {
    color: Colors.white,
    fontSize: fs(18),
    fontWeight: "bold",
  },
  switch: {
    color: Colors.green,
    marginTop: hp(2.5),
    textAlign: "center",
    fontWeight: "600",
    fontSize: fs(15),
  },
});
