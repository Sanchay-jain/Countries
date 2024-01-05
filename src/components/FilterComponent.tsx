import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const FilterComponent = ({ region, setRegion }) => {
  const [expanded, setExpanded] = useState(false);

  const { colors } = useTheme();
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleFilter = (r) => {
    if (r === region) {
      setRegion("");
    } else {
      setRegion(r);
    }
    setExpanded(false);
  };

  return (
    <View style={{ width: "50%", marginLeft: 20, zIndex: 22 }}>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: colors.card,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 5,
          gap: 5,
          height: 40,
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4.84,
        }}
        onPress={() => setExpanded(!expanded)}
      >
        <Text
          style={{ color: colors.text, fontFamily: "NunitoSans_600SemiBold" }}
        >
          {region || "Filter by Region"}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.text} />
      </Pressable>
      {expanded && (
        <View
          style={{
            backgroundColor: colors.card,
            position: "absolute",
            width: "100%",
            zIndex: 11,
            top: 45,
            paddingLeft: 15,
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4.84,
            paddingVertical: 15,
            gap: 10,
          }}
        >
          {regions.map((r) => (
            <TouchableOpacity
              key={r}
              style={{
                height: 20,
              }}
              onPress={() => handleFilter(r)}
            >
              <Text
                style={{
                  color: r === region ? "blue" : colors.text,
                  fontFamily: "NunitoSans_300Light",
                }}
              >
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default FilterComponent;
