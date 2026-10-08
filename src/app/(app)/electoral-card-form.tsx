import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ElectoralCardForm() {
  const params = useLocalSearchParams<{ name?: string; email?: string }>();
  const [name, setName] = useState(params.name ?? "");
  const [email, setEmail] = useState(params.email ?? "");
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
            <Pressable onPress={() => router.back()} hitSlop={8}>
              <Ionicons name="chevron-back" size={26} color={colors.text} />
            </Pressable>

            <Text style={styles.title}>Editar perfil</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número do Título</Text>

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
            <Text style={styles.label}>Zona</Text>

            <Input
              placeholder="Digite seu e-mail"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              rightIcon={<Ionicons name="mail" size={22} color={colors.icon} />}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Seção</Text>

            <Input
              placeholder="Digite seu e-mail"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              rightIcon={<Ionicons name="mail" size={22} color={colors.icon} />}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cidade eleitoral</Text>

            <Input
              placeholder="Digite seu e-mail"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              rightIcon={<Ionicons name="mail" size={22} color={colors.icon} />}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Estado Eleitoral</Text>

            <Input
              placeholder="Digite seu e-mail"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              rightIcon={<Ionicons name="mail" size={22} color={colors.icon} />}
            />
          </View>

          <Button
            title="Salvar alterações"
            onPress={handleSave}
            loading={loading}
            style={styles.saveButton}
          />
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },

  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
  },

  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 20,
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
