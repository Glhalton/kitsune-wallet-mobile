import { colors } from "@/constants/colors";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { ReactNode } from "react";

interface InputProps extends TextInputProps {
  rightIcon?: ReactNode;
  onRightIconPress?: () => void;
}

export function Input({
  rightIcon,
  onRightIconPress,
  style,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        style={[
          styles.input,
          rightIcon ? styles.inputWithIcon : undefined,
          style,
        ]}
      />

      {rightIcon && (
        <Pressable
          onPress={onRightIconPress}
          style={styles.iconButton}
          hitSlop={8}
          disabled={!onRightIconPress}
        >
          {rightIcon}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 54,
    position: "relative",
  },

  input: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    color: colors.text,
    fontSize: 15,
  },

  inputWithIcon: {
    paddingRight: 50,
  },

  iconButton: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 50,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
});
