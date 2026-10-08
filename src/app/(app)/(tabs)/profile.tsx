import { Button } from "@/components/ui/button";
import { ListRow } from "@/components/ui/ListRow";
import { colors } from "@/constants/colors";
import {
  getCurrentUser,
  signOut,
  UnauthorizedError,
  User,
} from "@/services/auth";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const appName = process.env.EXPO_PUBLIC_APP_NAME ?? "Kitsune Wallet";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((currentUser) => {
        if (active) {
          setUser(currentUser);
        }
      })
      .catch(async (error) => {
        if (error instanceof UnauthorizedError) {
          await signOut();
          router.replace("/login");
          return;
        }

        if (active) {
          setLoadFailed(true);
        }
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  const handleRetry = () => {
    setLoadFailed(false);
    setAttempt((previous) => previous + 1);
  };

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut();
    } finally {
      setSigningOut(false);
      router.replace("/login");
    }
  };

  const nameParts = user?.name.trim().split(/\s+/).slice(0, 2) ?? [];
  const displayName = nameParts.join(" ");
  const initials = nameParts
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.header}>
          {user ? (
            <>
              <View style={styles.avatar}>
                <Text style={styles.initials}>{initials}</Text>
              </View>

              <Text style={styles.name}>{displayName}</Text>

              <View style={styles.pill}>
                <View style={styles.pillDot} />
                <Text style={styles.pillText}>{user.email}</Text>
              </View>
            </>
          ) : loadFailed ? (
            <>
              <Text style={styles.errorText}>
                Não foi possível carregar seus dados.
              </Text>
              <Text style={styles.retry} onPress={handleRetry}>
                Tentar novamente
              </Text>
            </>
          ) : (
            <ActivityIndicator color={colors.primary} />
          )}
        </View>

        <View style={styles.sections}>
          <View>
            <Text style={styles.sectionTitle}>Conta</Text>

            <View style={styles.card}>
              <ListRow
                label="Editar perfil"
                iconName="create-outline"
                showSeparator={false}
                onPress={() => {
                  if (user) {
                    router.push({
                      pathname: "/edit-profile",
                      params: { name: user.name, email: user.email },
                    });
                  }
                }}
              />
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Preferências</Text>

            <View style={styles.card}>
              <ListRow
                label="Sobre o app"
                iconName="information-circle-outline"
                showSeparator={false}
                onPress={() =>
                  Alert.alert(
                    appName,
                    `Versão ${Constants.expoConfig?.version ?? "-"}`,
                  )
                }
              />
            </View>
          </View>

          <Button
            title="Sair da conta"
            onPress={handleSignOut}
            loading={signingOut}
            style={styles.signOutButton}
          />

          <Text style={styles.caption}>{appName.toUpperCase()}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 32,
  },

  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 24,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 170,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 24,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  initials: {
    color: colors.white,
    fontSize: 31,
    fontWeight: "800",
  },

  name: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 14,
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.border,
  },

  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },

  pillText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },

  errorText: {
    color: "#64748B",
    fontSize: 14,
    textAlign: "center",
  },

  retry: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },

  sections: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 24,
  },

  sectionTitle: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 8,
  },

  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    overflow: "hidden",
  },

  signOutButton: {
    width: "100%",
    backgroundColor: colors.danger,
  },

  caption: {
    color: colors.placeholder,
    fontSize: 11,
    letterSpacing: 2,
    textAlign: "center",
  },
});
