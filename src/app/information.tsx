import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function information() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.containerBox}>
        <View>
          <ThemedText style={styles.title}>
            Aplicativo criado com React Native e Expo.
          </ThemedText>
        </View>
        <View>
          <ThemedText style={styles.title}>
            Exibe os seguintes dados:
          </ThemedText>
          <ThemedText style={styles.text}>Nome completo</ThemedText>
          <ThemedText style={styles.text}>Curso</ThemedText>
          <ThemedText style={styles.text}>Mensagem de Bem-vindo</ThemedText>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  containerBox: {
    gap: 30,
  },
  imagem: {
    height: 200,
    width: 200,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    maxWidth: 300,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    maxWidth: 300,
  },
});
