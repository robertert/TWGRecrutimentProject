import { View, StyleSheet, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import { Image } from "expo-image";
import { useAuthStore } from "../../store/authStore";
import * as Linking from "expo-linking";
import { logger } from "../../utils/logger";

export default function SignIn() {
  const signIn = useAuthStore((state) => state.signIn);

  const handleOpenTerms = async () => {
    const url = "https://www.youtube.com/static?template=terms";
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        logger.warn("Cannot open URL:", url);
      }
    } catch (error) {
      logger.error("Error opening terms URL:", error);
    }
  };

  const handleOpenPrivacy = async () => {
    const url = "https://policies.google.com/privacy";
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        logger.warn("Cannot open URL:", url);
      }
    } catch (error) {
      logger.error("Error opening privacy URL:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/app-icon.svg")}
          style={styles.icon}
        />
      </View>
      <Text style={styles.title}>
        Welcome to the best{"\n"} YouTube-based learning{"\n"} application.
      </Text>
      <Pressable onPress={signIn}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Log in as guest</Text>
        </View>
      </Pressable>
      <Text style={styles.description}>
        By continuing you agree with {"\n"}
        <Text style={styles.link} onPress={handleOpenTerms}>
          Terms of Conditions
        </Text>{" "}
        and{" "}
        <Text style={styles.link} onPress={handleOpenPrivacy}>
          Privacy Policy
        </Text>
        .
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
    paddingHorizontal: 32,
  },

  logo: {
    width: 292,
    height: 116,
    marginTop: 60,
    alignSelf: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 128,
    width: 128,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    color: Colors.primary100,
    lineHeight: 24,
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: Colors.primary100,
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.primary700,
    height: 48,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    gap: 10,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: Colors.primary100,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 54,
  },
  link: {
    textDecorationLine: "underline",
    color: Colors.primary700,
  },
});
