import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { colors } from "@/constants/colors";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

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

      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Login", "Login realizado com sucesso!");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível realizar o login. Tente novamente.",
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
              <Image
                source={require("@/assets/images/kitsune-wallet.png")}
                style={{
                  width: 150,
                  height: 150,
                }}
              />
            </View>
          </View>

          <View style={styles.form}>
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
                  <Ionicons name={"person"} size={22} color={colors.icon} />
                }
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
            </View>

            <Pressable
              style={styles.forgotPassword}
              onPress={() => Alert.alert("Recuperação", "Em breve.")}
            >
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </Pressable>

            <Button title="Entrar" onPress={() => router.push("/documents")} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Ainda não possui uma conta?</Text>

            <Pressable onPress={() => router.push("./register")}>
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
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  logo: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
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

  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: 24,
  },

  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
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
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
