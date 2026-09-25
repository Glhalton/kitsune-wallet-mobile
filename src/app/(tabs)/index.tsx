import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [buttonClicks, setButtonClicks] = useState(0);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.informationBox}>
          <ThemedText style={styles.title}>Bem vindo(a)</ThemedText>
          <ThemedText style={styles.name}>
            Glhalton Amaro Bezerra de Sousa
          </ThemedText>
          <ThemedText style={styles.title}>Engenharia de Software</ThemedText>
        </View>
        <View>
          <Image
            source={require("../../assets/images/fumo.jpg")}
            style={styles.imagem}
            contentFit="cover"
          />
        </View>
        <View>
          <ThemedText style={styles.title}>
            Quantidade de vezes apertadas:
          </ThemedText>
          <ThemedText style={styles.title}>{buttonClicks}</ThemedText>
        </View>
        <View style={styles.buttonsBox}>
          <Button
            titulo="Aperte aqui"
            onPress={() => {
              ToastAndroid.showWithGravity(
                "Você apertou o botão",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              setButtonClicks(buttonClicks + 1);
            }}
          />
          <Button
            titulo="Informação"
            onPress={() => {
              router.push("/information");
            }}
          />
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
  imagem: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: 20,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  buttonsBox: {
    gap: 15,
  },
  informationBox: {
    gap: 10,
  },
});
