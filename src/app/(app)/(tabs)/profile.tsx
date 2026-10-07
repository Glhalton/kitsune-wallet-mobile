import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const [name, setName] = useState("Fulano da Silva");
  const [email, setEmail] = useState("fulano@email.com");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Atenção", "Preencha o nome e o e-mail.");
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Perfil", "Dados atualizados com sucesso!");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível atualizar o perfil. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Ionicons
              name="person-circle"
              size={110}
              color={colors.primary}
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Editar perfil</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>

              <Input
                placeholder="Digite seu nome"
                placeholderTextColor={colors.placeholder}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                editable={!loading}
                rightIcon={
                  <Ionicons name="person" size={22} color={colors.icon} />
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>

              <Input
                placeholder="Digite seu e-mail"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                rightIcon={
                  <Ionicons name="mail" size={22} color={colors.icon} />
                }
              />
            </View>

            <Button
              title="Salvar alterações"
              onPress={handleSave}
              loading={loading}
              style={styles.saveButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  header: {
    alignItems: "center",
    marginBottom: 32,
  },

  name: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },

  email: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 4,
  },

  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 20,
  },

  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 20,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  saveButton: {
    width: "100%",
    marginTop: 4,
  },
});
