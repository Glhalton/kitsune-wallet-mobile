import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  titulo: string;
}

export function Button({ titulo, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity {...rest} style={styles.box}>
      <Text style={styles.title}>{titulo}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: "#f54444",
    width: 340,
    height: 55,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
});
