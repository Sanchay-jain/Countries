import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({
  onSearch,
  placeholder = "Search for a country...",
  value = "",
  ...props
}: {
  onSearch: (value: string) => void;
  placeholder?: string;
  value?: string;
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Ionicons name="search" size={20} color={colors.text} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onSearch}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.84,
    gap: 20,
  },
  input: {
    fontSize: 16,
    fontFamily: "NunitoSans_600SemiBold",
    flex: 1,
    height: "100%",
  },
});

export default SearchBar;
