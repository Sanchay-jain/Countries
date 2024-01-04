import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, Pressable } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Detail from "../components/Detail";
import { useTheme } from "@react-navigation/native";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";

const Details = ({ route, navigation }: any) => {
  let country = route.params.country;
  const [borders, setBorders] = useState([]);
  const { colors } = useTheme();
  const getBorders = () => {
    axios
      .get(`/alpha?codes=${country?.borders}`)
      .then((response) => {
        setBorders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    country?.borders && getBorders();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, padding: 20 }}>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: colors.card,
            width: 100,
            padding: 5,
            justifyContent: "center",
            marginBottom: 40,
            marginTop: 10,
            borderRadius: 4,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <Ionicons name="arrow-back" size={16} color={colors.text} />
          <Text
            style={{ fontFamily: "NunitoSans_300Light", color: colors.text }}
          >
            Back
          </Text>
        </Pressable>
        <ScrollView>
          <Image
            source={{ uri: country.flags.png }}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: 1.5,
            }}
          />
          <Text
            style={{
              fontFamily: "NunitoSans_800ExtraBold",
              fontSize: 20,
              color: colors.text,
              marginBottom: 20,
              marginTop: 30,
            }}
          >
            {country.name.common}
          </Text>
          <View style={{ gap: 10, marginBottom: 30 }}>
            <Detail
              label="Native Name"
              value={Object.values(country.name.nativeName)[0].official}
            />
            <Detail
              label="Population"
              value={Intl.NumberFormat("en-US").format(country.population)}
            />
            <Detail label="Region" value={country.region} />
            <Detail label="Subregion" value={country.subregion} />
            <Detail label="Capital" value={country.capital} />
          </View>
          <View style={{ gap: 10 }}>
            <Detail label="Top Level Domain" value={country.tld} />
            <Detail
              label="Currencies"
              value={Object.values(country.currencies)
                .map((currency: any) => currency.name)
                .join(", ")}
            />

            <Detail
              label="Languages"
              value={Object.values(country.languages).join(", ")}
            />
            <View>
              <Text
                style={{
                  color: colors.text,
                  fontFamily: "NunitoSans_600SemiBold",
                  marginTop: 10,
                }}
              >
                Border Countries:
              </Text>
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
              >
                {borders.length != 0 &&
                  borders.map((border) => (
                    <Pressable
                      onPress={() =>
                        navigation.replace("Details", { country: border })
                      }
                      style={{
                        backgroundColor: colors.card,
                        borderRadius: 4,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginRight: 10,
                        marginTop: 15,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 4.84,
                      }}
                    >
                      <Text style={{ color: colors.text }}>
                        {border.name.common}
                      </Text>
                    </Pressable>
                  ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Details;
