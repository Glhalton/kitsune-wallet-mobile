import { router } from "expo-router";
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
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");
      return;
    }

    try {
      setLoading(true);

      // Aqui você poderá chamar sua API:
      //
      // const response = await fetch(`${API_URL}/auth/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Login", "Login realizado com sucesso!");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível realizar o login. Tente novamente."
      );
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
            <View style={styles.logo}>
              <Text style={styles.logoText}>K</Text>
            </View>

            <Text style={styles.title}>Bem-vindo de volta!</Text>

            <Text style={styles.subtitle}>
              Entre na sua conta para continuar.
            </Text>
          </View>

          <View style={styles.form}>
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
            </View>

            <Pressable
              style={styles.forgotPassword}
              onPress={() => Alert.alert("Recuperação", "Em breve.")}
            >
              <Text style={styles.forgotPasswordText}>
                Esqueceu sua senha?
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
                loading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "Entrando..." : "Entrar"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Ainda não possui uma conta?</Text>

            <Pressable
              onPress={() => router.push("./register")}
            >
              <Text style={styles.registerText}> Criar conta</Text>
            </Pressable>
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
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
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

  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: 24,
  },

  forgotPasswordText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },

  loginButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonPressed: {
    opacity: 0.85,
  },

  loginButtonDisabled: {
    opacity: 0.6,
  },

  loginButtonText: {
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

  registerText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "700",
  },
});