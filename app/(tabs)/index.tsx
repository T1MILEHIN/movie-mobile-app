import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, View } from "react-native";
import SearchBar from "@/components/searchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";


export default function Index() {
  const router = useRouter()
  const { data: movies, loading, error } = useFetch(() => fetchMovies({ query: "" }))
  return (
    <View className="flex-1 bg-primary font-[Poppins]">
      <ScrollView className="px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%"
        }}>
        <Image className="size-2 object-cover mx-auto" source={require("../../assets/images/react-logo.png")} />
        {loading ?
          (<ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />)
          :
          error ? (
            <Text className="text-red-500 text-center">Error Loading Movies</Text>
          )
            :
            (
              <View className="flex-1 mt-5">
                <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" />
                <View>
                  <Text className="text-lg font-bold mt-5 mb-3 text-white font-[Poppins]">
                    Popular Movies
                  </Text>
                  <FlatList
                    data={movies}
                    renderItem={({ item }: any) => (
                      <MovieCard {...item} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{
                      justifyContent: "flex-start",
                      gap: 20,
                      marginBottom: 20
                    }}
                    scrollEnabled={false}
                  />
                </View>
              </View>
            )
        }
      </ScrollView >
    </View >
  )
}