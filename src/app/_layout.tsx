import { Slot, Stack } from "expo-router";
import "../../global.css";

export default function RootLayot() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Meditations" }} />
    </Stack>
  );
}
