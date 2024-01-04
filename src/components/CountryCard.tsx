import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Detail from "./Detail";

const CountryCard = ({ item }: any) => {
  const navigation: any = useNavigation();
  const { colors } = useTheme();
  return (
    <Pressable
      style={{
        gap: 20,
        borderRadius: 8,
        backgroundColor: colors.card,
        paddingBottom: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.84,
      }}
      onPress={() => navigation.navigate("Details", { country: item })}
    >
      <Image
        source={{ uri: item.flags.png }}
        style={{
          width: "100%",
          aspectRatio: 1.5,
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
        }}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            fontFamily: "NunitoSans_800ExtraBold",
            fontSize: 20,
            color: colors.text,
          }}
        >
          {item.name.common}
        </Text>
        <View style={{ gap: 6, marginTop: 10 }}>
          <Detail
            label="Population"
            value={Intl.NumberFormat("en-US").format(item.population)}
          />
          <Detail label="Region" value={item.region} />
          <Detail label="Capital" value={item.capital} />
        </View>
      </View>
    </Pressable>
  );
};

export default CountryCard;
