import NameItem from "@/components/name-item";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Person = {
  id: string;
  name: string;
};

export default function Index() {
  const [people, setPeople] = useState<Person[]>([]);
  const [text, setText] = useState<string>("");
  const [winner, setWinner] = useState<string | null>(null);
  const canDraw = people.length >= 2;

  function addName() {
    const trimmedText = text.trim();
    if (trimmedText === "") return;
    setPeople([...people, { id: Date.now().toString(), name: trimmedText }]);
    setText("");
  }

  function removeName(id: string) {
    setPeople(people.filter((person) => person.id !== id));
  }

  function draw() {
    const index = Math.floor(Math.random() * people.length);
    setWinner(people[index].name);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Sorteador 🎲</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          style={styles.input}
          placeholder="Digite um nome"
          onChangeText={setText}
          onSubmitEditing={addName}
        />
        <Pressable style={styles.addButton} onPress={addName}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>
      </View>
      <FlatList
        data={people}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum nome adicionado ainda.</Text>
        }
        keyExtractor={(person) => person.id}
        renderItem={({ item }) => (
          <NameItem name={item.name} onRemove={() => removeName(item.id)} />
        )}
      />
      {winner !== null && (
        <View style={styles.winnerCard}>
          <Text style={styles.winnerLabel}>Sorteado</Text>
          <Text style={styles.winnerName}>🎉 {winner}</Text>
        </View>
      )}
      <Pressable
        style={[styles.drawButton, !canDraw && styles.drawButtonDisabled]}
        onPress={draw}
        disabled={!canDraw}
      >
        <Ionicons name="shuffle" size={24} color="#fff" />
        <Text style={styles.drawButtonText}>Sortear</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20, gap: 16, backgroundColor: "#FFF8F0" },
  title: { fontSize: 30, fontWeight: "bold", color: "#0B3D6E" },
  inputRow: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F1E4D6",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: "#F28C28",
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  name: { fontSize: 18, color: "#1F2933" },
  list: { gap: 8 },
  empty: { fontSize: 16, color: "#6B7280", textAlign: "center", marginTop: 24 },
  flatList: { flex: 1 },
  winnerCard: {
    backgroundColor: "#0B3D6E",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    gap: 4,
  },
  winnerLabel: { color: "#C9D8E8", fontSize: 14 },
  winnerName: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  drawButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F28C28",
    borderRadius: 16,
    paddingVertical: 16,
  },
  drawButtonDisabled: { opacity: 0.4 },
  drawButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
