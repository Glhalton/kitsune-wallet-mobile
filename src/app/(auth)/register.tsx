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
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@/components/ui/Input";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleRegister = async () => {
    const formattedName = name.trim();
    const formattedEmail = email.trim().toLowerCase();

    if (!formattedName || !formattedEmail || !password) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Senha inválida",
        "A senha deve possuir pelo menos 6 caracteres.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formattedName,
          email: formattedEmail,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        const message = Array.isArray(data.message)
          ? data.message.join("\n")
          : data.message;

        Alert.alert("Erro", message ?? "Não foi possível criar sua conta");
        return;
      }

      Alert.alert("Sucesso", "Sua conta foi criada!", [
        {
          text: "Continuar",
          onPress: () => router.replace("/login"),
        },
      ]);
    } catch {
      Alert.alert("Erro", "Não foi possível criar sua conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
            <Text style={styles.title}>Criar sua conta</Text>

            <Text style={styles.subtitle}>
              Preencha seus dados para começar.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome completo</Text>

              <Input
                placeholder="Digite seu nome completo"
                placeholderTextColor={colors.placeholder}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                editable={!loading}
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
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>

              <Input
                placeholder="Digite sua senha"
                placeholderTextColor={colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!loading}
                rightIcon={
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color={colors.icon}
                  />
                }
                onRightIconPress={() =>
                  setShowPassword((previous) => !previous)
                }
              />
              <Text style={styles.passwordHint}>
                A senha deve possuir pelo menos 6 caracteres.
              </Text>
            </View>

            <Button
              title="Criar conta"
              disabled={loading}
              loading={loading}
              onPress={() => handleRegister()}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Já possui uma conta?</Text>

            <Link href="/login" asChild>
              <Pressable disabled={loading}>
                <Text style={styles.loginText}> Entrar</Text>
              </Pressable>
            </Link>
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
    paddingVertical: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 36,
  },

  title: {
    color: "#0F172A",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },

  form: {
    width: "100%",
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

  passwordHint: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 7,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },

  footerText: {
    color: "#64748B",
    fontSize: 14,
  },

  loginText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
