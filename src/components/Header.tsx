import { Appearance, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: colors.card }]}>
      <Text
        style={{
          fontFamily: "NunitoSans_800ExtraBold",
          color: colors.text,
        }}
      >
        Where in the world?
      </Text>
      <Pressable
        style={{ flexDirection: "row", gap: 10 }}
        onPress={() => {
          Appearance.getColorScheme() === "light"
            ? Appearance.setColorScheme("dark")
            : Appearance.setColorScheme("light");
        }}
      >
        <Ionicons name="moon" size={16} color={colors.text} />
        <Text style={{ fontFamily: "NunitoSans_300Light", color: colors.text }}>
          Dark Mode
        </Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
