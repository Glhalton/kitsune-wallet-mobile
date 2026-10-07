import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
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

      // Aqui você poderá chamar sua API:
      //
      // await fetch(`${API_URL}/users`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name,
      //     email,
      //     password,
      //   }),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1000));

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

              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>

              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#9CA3AF"
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

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />

                <Pressable
                  onPress={() => setShowPassword((previous) => !previous)}
                  style={styles.showButton}
                >
                  <Text style={styles.showButtonText}>
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Text>
                </Pressable>
              </View>

              <Text style={styles.passwordHint}>
                A senha deve possuir pelo menos 6 caracteres.
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.registerButton,
                pressed && styles.registerButtonPressed,
                loading && styles.registerButtonDisabled,
              ]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>
                {loading ? "Criando conta..." : "Criar conta"}
              </Text>
            </Pressable>
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

  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
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

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    color: "#0F172A",
    fontSize: 15,
  },

  passwordContainer: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    color: "#0F172A",
    fontSize: 15,
  },

  showButton: {
    paddingHorizontal: 14,
  },

  showButtonText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "600",
  },

  passwordHint: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 7,
  },

  registerButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  registerButtonPressed: {
    opacity: 0.85,
  },

  registerButtonDisabled: {
    opacity: 0.6,
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
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
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "700",
  },
});
