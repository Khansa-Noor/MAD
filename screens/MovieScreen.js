import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function MovieScreen() {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { isDark } = useContext(ThemeContext);
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    fetch("https://reactnative.dev/movies.json")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
        setFiltered(data.movies);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (text) => {
    setSearch(text);

    const filteredData = movies.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase()),
    );

    setFiltered(filteredData);
  };

  if (loading) {
    return (
      <View style={[styles.loader, { backgroundColor: theme.bg }]}>
        <ActivityIndicator size="large" color="#38bdf8" />
        <Text style={[styles.loaderText, { color: theme.text }]}>
          Loading Movies...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <Text style={[styles.title, { color: theme.text }]}>🎬 Movie Hub</Text>

      <Text style={styles.subtitle}>Discover trending movies</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Search movies..."
        placeholderTextColor="#94a3b8"
        value={search}
        onChangeText={handleSearch}
        style={[
          styles.searchBar,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
      />

      {/* Trending Horizontal List */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        🔥 Trending
      </Text>

      <FlatList
        data={filtered.slice(0, 3)}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.trendingCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.movieTitle, { color: theme.text }]}>
              {item.title}
            </Text>
            <Text style={styles.year}>{item.releaseYear}</Text>
          </View>
        )}
      />

      {/* All Movies */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        🎞 All Movies
      </Text>

      {filtered.map((item) => (
        <View
          key={item.id}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.movieTitle, { color: theme.text }]}>
            {item.title}
          </Text>
          <Text style={styles.year}>Released: {item.releaseYear}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginBottom: 15,
  },

  searchBar: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },

  trendingCard: {
    width: 140,
    padding: 14,
    borderRadius: 14,
    marginRight: 10,
    borderWidth: 1,
  },

  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },

  movieTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  year: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loaderText: {
    marginTop: 10,
  },
});

const darkTheme = {
  bg: "#0f172a",
  card: "#1e293b",
  text: "#ffffff",
  border: "#334155",
};

const lightTheme = {
  bg: "#f1f5f9",
  card: "#ffffff",
  text: "#0f172a",
  border: "#e2e8f0",
};
