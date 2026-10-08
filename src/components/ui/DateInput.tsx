import { colors } from "@/constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface DateInputProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function DateInput({
  value,
  onChange,
  placeholder = "Selecione uma data",
  disabled = false,
  style,
}: DateInputProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (
    _event: unknown,
    selectedDate?: Date,
  ) => {
    setOpen(false);

    if (selectedDate) {
      onChange?.(selectedDate);
    }
  };

  const formattedDate = value
    ? value.toLocaleDateString("pt-BR")
    : placeholder;

  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={[
          styles.input,
          disabled ? styles.disabled : undefined,
        ]}
        onPress={() => setOpen(true)}
        disabled={disabled}
      >
        <Text
          style={[
            styles.text,
            !value ? styles.placeholder : undefined,
          ]}
        >
          {formattedDate}
        </Text>

        <Ionicons
          name="calendar-outline"
          size={22}
          color={colors.icon}
        />
      </Pressable>

      {open && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="spinner"
          maximumDate={new Date()}
          onChange={handleChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 54,
  },

  input: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    color: colors.text,
    fontSize: 15,
  },

  placeholder: {
    color: colors.placeholder,
  },

  disabled: {
    opacity: 0.5,
  },
});