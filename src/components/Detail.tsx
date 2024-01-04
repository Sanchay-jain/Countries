//text component with a label and value
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

const Detail = ({ label, value }: { label: string; value: string }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{ fontFamily: "NunitoSans_600SemiBold", color: colors.text }}
      >
        {label}:{" "}
      </Text>
      <Text style={{ fontFamily: "NunitoSans_300Light", color: colors.text }}>
        {value}
      </Text>
    </View>
  );
};

export default Detail;
