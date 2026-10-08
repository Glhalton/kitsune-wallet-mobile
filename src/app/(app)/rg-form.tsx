import * as SecureStore from "expo-secure-store";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/DateInput";
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

export default function RgForm() {
  const [issuingAuthority, setIssuingAuthority] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [registerNumber, setRegisterNumber] = useState<string>();
  const [militaryCertification, setMilitaryCertification] = useState<string>();
  const [issueDate, setIssueDate] = useState<Date>();
  const [uf, setUf] = useState<string>();
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleSave = async () => {
    if (
      !cpf ||
      !issueDate ||
      !issuingAuthority ||
      !registerNumber ||
      !militaryCertification ||
      !uf
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);

      const accessToken = await SecureStore.getItemAsync("accessToken");

      const response = await fetch(`${apiUrl}/rg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          issuingAuthority,
          registerNumber,
          cpf,
          militaryCertification,
          uf: uf.toUpperCase(),
          issueDate: issueDate.toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = Array.isArray(data.message)
          ? data.message.join("\n")
          : data.message;

        Alert.alert("Erro", message ?? "Não foi possível cadastrar o RG.");

        return;
      }

      Alert.alert("Sucesso", "RG cadastrado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
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

            <Text style={styles.title}>Registrar RG</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número do RG</Text>

            <Input
              placeholder="12345678"
              placeholderTextColor={colors.placeholder}
              value={registerNumber}
              onChangeText={setRegisterNumber}
              autoCapitalize="none"
              keyboardType="numeric"
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Autoridade emissora</Text>

            <Input
              placeholder="PC"
              placeholderTextColor={colors.placeholder}
              value={issuingAuthority}
              onChangeText={setIssuingAuthority}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CPF</Text>

            <Input
              placeholder="1234567890"
              placeholderTextColor={colors.placeholder}
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Certificado militar</Text>

            <Input
              placeholder="11223344556677"
              placeholderTextColor={colors.placeholder}
              value={militaryCertification}
              onChangeText={setMilitaryCertification}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Estado de emissão</Text>

            <Input
              placeholder="PA"
              placeholderTextColor={colors.placeholder}
              value={uf}
              onChangeText={setUf}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data de emissão</Text>

            <DateInput
              value={issueDate}
              onChange={setIssueDate}
              placeholder="01/01/2026"
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
