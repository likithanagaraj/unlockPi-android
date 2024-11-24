import AsyncStorage from "@react-native-async-storage/async-storage";

// Get token from storage
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Save token to storage
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Remove token from storage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
