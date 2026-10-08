import { colors } from "@/constants/colors";
import { DocumentType, getDocumentTypes } from "@/services/documents";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DocumentTypePickerProps {
  /** Type currently being saved; disables the list and shows a spinner on it. */
  savingTypeId: number | null;
  onSelect: (documentType: DocumentType) => void;
  onClose: () => void;
  onError: (error: unknown) => void;
}

/**
 * Bottom sheet listing the document types from the API. Render it only while
 * it should be open, so the types are fetched again each time.
 */
export function DocumentTypePicker({
  savingTypeId,
  onSelect,
  onClose,
  onError,
}: DocumentTypePickerProps) {
  const insets = useSafeAreaInsets();
  const [documentTypes, setDocumentTypes] = useState<DocumentType[] | null>(
    null,
  );

  useEffect(() => {
    let active = true;

    getDocumentTypes()
      .then((loadedTypes) => {
        if (active) {
          setDocumentTypes(loadedTypes);
        }
      })
      .catch((error) => {
        if (active) {
          onError(error);
        }
      });

    return () => {
      active = false;
    };
  }, [onError]);

  const saving = savingTypeId !== null;

  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={saving ? undefined : onClose}>
        <Pressable
          style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}
          onPress={() => {}}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Escolha o tipo de documento</Text>

            <Pressable onPress={onClose} hitSlop={8} disabled={saving}>
              <Ionicons name="close" size={24} color={colors.icon} />
            </Pressable>
          </View>

          {documentTypes === null ? (
            <ActivityIndicator color={colors.primary} style={styles.loading} />
          ) : (
            <FlatList
              data={documentTypes}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Pressable
                  disabled={saving}
                  onPress={() => onSelect(item)}
                  style={({ pressed }) => [
                    styles.row,
                    (pressed || saving) && styles.rowDimmed,
                  ]}
                >
                  <View style={styles.rowText}>
                    <Text style={styles.rowName}>{item.name}</Text>
                    <Text style={styles.rowDescription}>
                      {item.description}
                    </Text>
                  </View>

                  {savingTypeId === item.id ? (
                    <ActivityIndicator color={colors.primary} />
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={colors.icon}
                    />
                  )}
                </Pressable>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Nenhum tipo de documento disponível.
                </Text>
              }
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },

  sheet: {
    maxHeight: "70%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },

  loading: {
    paddingVertical: 32,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  rowDimmed: {
    opacity: 0.6,
  },

  rowText: {
    flex: 1,
  },

  rowName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },

  rowDescription: {
    color: "#64748B",
    fontSize: 13,
    marginTop: 2,
  },

  emptyText: {
    color: "#64748B",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 32,
  },
});
