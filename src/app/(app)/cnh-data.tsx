import * as SecureStore from "expo-secure-store";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Rg {
  id: number;
  documentId: number;
  issuingAuthority: string;
  registerNumber: string;
  cpf: string;
  militaryCertification: string;
  uf: string;
  issueDate: string;
}

export default function RgDetailsScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { id } = useLocalSearchParams<{ id: string }>();

  const [rg, setRg] = useState<Rg | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRg();
  }, [id]);

  const loadRg = async () => {
    try {
      setLoading(true);

      const accessToken = await SecureStore.getItemAsync("accessToken");

      if (!accessToken) {
        Alert.alert(
          "Sessão expirada",
          "Faça login novamente para continuar.",
        );

        router.replace("/login");
        return;
      }

      const response = await fetch(`${apiUrl}/rg/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const message = Array.isArray(data.message)
          ? data.message.join("\n")
          : data.message;

        Alert.alert(
          "Erro",
          message ?? "Não foi possível carregar o RG.",
        );

        return;
      }

      setRg(data);
    } catch (error) {
      console.error("Erro ao carregar RG:", error);

      Alert.alert(
        "Erro",
        "Não foi possível carregar as informações do RG.",
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!rg) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Ionicons
            name="document-text-outline"
            size={48}
            color={colors.icon}
          />

          <Text style={styles.emptyTitle}>
            RG não encontrado
          </Text>

          <Text style={styles.emptyText}>
            Não foi possível encontrar as informações deste documento.
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            style={styles.backIcon}
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color={colors.text}
            />
          </Pressable>

          <Text style={styles.title}>Meu RG</Text>
        </View>

        <View style={styles.documentHeader}>
          <View style={styles.documentIcon}>
            <Ionicons
              name="card"
              size={32}
              color={colors.primary}
            />
          </View>

          <View style={styles.documentHeaderInfo}>
            <Text style={styles.documentTitle}>
              Registro Geral
            </Text>

            <Text style={styles.documentSubtitle}>
              Documento de identidade
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Informações pessoais
          </Text>

          <InfoItem
            label="CPF"
            value={rg.cpf}
          />

          <InfoItem
            label="Número do RG"
            value={rg.registerNumber}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Informações do documento
          </Text>

          <InfoItem
            label="Órgão emissor"
            value={rg.issuingAuthority}
          />

          <InfoItem
            label="Estado de emissão"
            value={rg.uf}
          />

          <InfoItem
            label="Data de emissão"
            value={formatDate(rg.issueDate)}
          />

          <InfoItem
            label="Certificado militar"
            value={rg.militaryCertification}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>

      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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
    marginBottom: 28,
  },

  backIcon: {
    padding: 2,
  },

  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
  },

  documentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  documentIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary + "15",
    marginRight: 16,
  },

  documentHeaderInfo: {
    flex: 1,
  },

  documentTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },

  documentSubtitle: {
    color: "#64748B",
    fontSize: 14,
  },

  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  infoItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  infoLabel: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 5,
  },

  infoValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },

  emptyText: {
    color: "#64748B",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },

  backButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },

  backButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
