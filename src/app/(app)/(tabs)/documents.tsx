import { DocumentTypePicker } from "@/components/DocumentTypePicker";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/colors";
import { signOut, UnauthorizedError } from "@/services/auth";
import {
  createDocument,
  Document,
  DocumentType,
  getDocuments,
} from "@/services/documents";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Status = "loading" | "refreshing" | "ready" | "error";

async function handleUnauthorized() {
  await signOut();
  router.replace("/login");
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [savingTypeId, setSavingTypeId] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    getDocuments()
      .then((loadedDocuments) => {
        if (active) {
          setDocuments(loadedDocuments);
          setStatus("ready");
        }
      })
      .catch(async (error) => {
        if (error instanceof UnauthorizedError) {
          await handleUnauthorized();
          return;
        }

        if (active) {
          setStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  const reload = (nextStatus: Status) => {
    setStatus(nextStatus);
    setAttempt((previous) => previous + 1);
  };

  const handlePickerError = useCallback(async (error: unknown) => {
    setPickerOpen(false);

    if (error instanceof UnauthorizedError) {
      await handleUnauthorized();
      return;
    }

    Alert.alert("Erro", "Não foi possível carregar os tipos de documento.");
  }, []);

  const handleSelectType = (documentType: DocumentType) => {
    setPickerOpen(false);

    switch (documentType.name.toLowerCase()) {
      case "rg":
        router.push("/rg-form");
        break;

      case "título de eleitor":
        router.push("/electoral-card-form");
        break;

      case "cnh":
        router.push("/cnh-form");
        break;

      default:
        Alert.alert(
          "Tipo não suportado",
          `Ainda não existe um formulário para ${documentType.name}.`,
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Documentos</Text>
        <Text style={styles.subtitle}>Seus documentos salvos</Text>
      </View>

      {status === "loading" ? (
        <View style={styles.empty}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={documents}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={status === "refreshing"}
              onRefresh={() => reload("refreshing")}
              tintColor={colors.primary}
            />
          }
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => {
                switch (item.documentType.name.toLowerCase()) {
                  case "rg":
                    router.push({
                      pathname: "/rg-data",
                      params: {
                        documentId: String(item.id),
                      },
                    });
                    break;

                  case "cnh":
                    router.push({
                      pathname: "/cnh-data",
                      params: {
                        documentId: String(item.id),
                      },
                    });
                    break;

                  case "título de eleitor":
                    router.push({
                      pathname: "/electoral-card-data",
                      params: {
                        documentId: String(item.id),
                      },
                    });
                    break;

                  default:
                    Alert.alert(
                      "Documento",
                      `Não existe uma tela para ${item.documentType.name}.`,
                    );
                }
              }}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>{item.documentType.name}</Text>

                <Ionicons name="card-outline" size={26} color={colors.white} />
              </View>

              <Text style={styles.cardDescription}>
                {item.documentType.description}
              </Text>

              <Text style={styles.cardDate}>
                Adicionado em{" "}
                {new Date(item.createdAt).toLocaleDateString("pt-BR")}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            status === "error" ? (
              <View style={styles.empty}>
                <Ionicons
                  name="cloud-offline-outline"
                  size={48}
                  color={colors.placeholder}
                />
                <Text style={styles.emptyText}>
                  Não foi possível carregar seus documentos.
                </Text>
                <Text style={styles.retry} onPress={() => reload("loading")}>
                  Tentar novamente
                </Text>
              </View>
            ) : (
              <View style={styles.empty}>
                <Ionicons
                  name="file-tray-outline"
                  size={48}
                  color={colors.placeholder}
                />
                <Text style={styles.emptyText}>
                  Nenhum documento cadastrado.
                </Text>
              </View>
            )
          }
        />
      )}

      <View style={styles.footer}>
        <Button
          title="Adicionar documento"
          onPress={() => setPickerOpen(true)}
          disabled={status === "loading"}
          style={styles.addButton}
        />
      </View>

      {pickerOpen && (
        <DocumentTypePicker
          savingTypeId={savingTypeId}
          onSelect={handleSelectType}
          onClose={() => setPickerOpen(false)}
          onError={handlePickerError}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },

  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 4,
  },

  list: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 16,
  },

  card: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 20,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  cardLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  cardDescription: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },

  cardDate: {
    color: "#CBD5E1",
    fontSize: 13,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  emptyText: {
    color: "#64748B",
    fontSize: 14,
  },

  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  addButton: {
    width: "100%",
  },

  retry: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  cardPressed: {
    opacity: 0.85,
  },
});
