import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ListRowProps {
  label: string;
  iconName: ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  showSeparator?: boolean;
}

export function ListRow({
  label,
  iconName,
  onPress,
  showSeparator = true,
}: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Ionicons name={iconName} size={20} color={colors.primary} />

      <View style={[styles.content, showSeparator && styles.separator]}>
        <Text style={styles.label}>{label}</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.icon} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    gap: 14,
  },

  pressed: {
    opacity: 0.6,
  },

  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingRight: 16,
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
});
