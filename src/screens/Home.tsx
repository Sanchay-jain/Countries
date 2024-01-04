import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CountryCard from "../components/CountryCard";
import FilterComponent from "../components/FilterComponent";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = () => {
    axios
      .get("/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  //filter countries
  const filterCountries = (region: string, countriesToFilter = countries) => {
    return countriesToFilter.filter((country) => country.region === region);
  };
  const searchCountries = (value: string, countriesToSearch = countries) => {
    return countriesToSearch.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
  };
  useEffect(() => {
    if (region && search) {
      setFilteredCountries(searchCountries(search, filterCountries(region)));
    } else if (region) {
      setFilteredCountries(filterCountries(region));
    } else if (search) {
      setFilteredCountries(searchCountries(search));
    } else {
      setFilteredCountries(countries);
    }
  }, [region, search]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background, gap: 20 }}
    >
      <Header />
      <SearchBar onSearch={setSearch} value={search} />
      <FilterComponent region={region} setRegion={setRegion} />
      {(region || search) && filteredCountries.length === 0 ? (
        <Text style={{ textAlign: "center", color: colors.text }}>
          No results
        </Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredCountries.length > 0 ? filteredCountries : countries}
          renderItem={({ item }) => <CountryCard item={item} />}
          keyExtractor={(item) => item.cca3}
          contentContainerStyle={{
            gap: 20,
            marginTop: 20,
            marginHorizontal: 60,
          }}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Home;
