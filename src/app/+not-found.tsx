import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>404</Text>

      <Text style={styles.title}>Página não encontrada</Text>

      <Text style={styles.description}>
        A página que você tentou acessar não existe.
      </Text>

      <Link href="/login" style={styles.link}>
        Voltar para o login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  code: {
    fontSize: 64,
    fontWeight: "800",
  },

  title: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "700",
  },

  description: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
  },

  link: {
    marginTop: 24,
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "600",
  },
});