import { Platform } from "react-native";
import Constants from "expo-constants";

export const isSimulator = Platform.OS === "ios" && !Constants.isDevice;
