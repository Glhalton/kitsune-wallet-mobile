import { Button } from "@/components/ui/button";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DocumentCard {
  id: string;
  label: string;
  holder: string;
  lastDigits: string;
}

const initialCards: DocumentCard[] = [
  {
    id: "1",
    label: "RG",
    holder: "Fulano da Silva",
    lastDigits: "4921",
  },
  {
    id: "2",
    label: "CNH",
    holder: "Fulano da Silva",
    lastDigits: "7730",
  },
  {
    id: "3",
    label: "Cartão de crédito",
    holder: "Fulano da Silva",
    lastDigits: "1058",
  },
];

export default function Documents() {
  const [cards, setCards] = useState<DocumentCard[]>(initialCards);

  const handleAddCard = () => {
    setCards((previous) => [
      ...previous,
      {
        id: String(Date.now()),
        label: `Novo cartão ${previous.length + 1}`,
        holder: "Fulano da Silva",
        lastDigits: "0000",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Documentos</Text>
        <Text style={styles.subtitle}>Seus cartões e documentos salvos</Text>
      </View>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Ionicons name="card-outline" size={26} color={colors.white} />
            </View>

            <Text style={styles.cardNumber}>
              •••• •••• •••• {item.lastDigits}
            </Text>

            <Text style={styles.cardHolder}>{item.holder}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="file-tray-outline"
              size={48}
              color={colors.placeholder}
            />
            <Text style={styles.emptyText}>Nenhum cartão cadastrado.</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <Button
          title="Adicionar cartão"
          onPress={handleAddCard}
          style={styles.addButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },

  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 4,
  },

  list: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 16,
  },

  card: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 20,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  cardLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  cardNumber: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 12,
  },

  cardHolder: {
    color: "#CBD5E1",
    fontSize: 13,
    textTransform: "uppercase",
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  emptyText: {
    color: "#64748B",
    fontSize: 14,
  },

  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  addButton: {
    width: "100%",
  },
});
