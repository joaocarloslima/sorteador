import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type NameItemProps = {
  name: string;
  onRemove: () => void;
};

export default function NameItem({ name, onRemove }: NameItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      <Pressable onPress={onRemove} hitSlop={8}>
        <Ionicons name="trash-outline" size={22} color="#C0392B" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  name: { flex: 1, fontSize: 18, color: "#1F2933" },
});
