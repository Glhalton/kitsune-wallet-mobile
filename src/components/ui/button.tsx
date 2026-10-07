import { colors } from "@/constants/colors";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function Button({
  title,
  loading = false,
  disabled = false,
  onPress,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled;
  return (
    <TouchableOpacity
      {...rest}
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.box,
        { backgroundColor: colors.primary, opacity: isDisabled ? 0.6 : 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  box: {
    width: 340,
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
