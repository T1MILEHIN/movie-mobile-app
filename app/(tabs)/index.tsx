import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import SearchBar from "@/components/searchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import TrendingCard from "@/components/trendingCard";
import MovieCard from "@/components/movieCard";
import { getTrendingMovie } from "@/services/appwrite";


export default function Index() {
  const router = useRouter()
  const { data: trendingMovies, loading: trendsLoading, error: trendsError } = useFetch(getTrendingMovie);
  const { data: movies, loading, error } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary font-poppins">
      <ScrollView className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          minHeight: "100%"
        }}>
        <Image className="size-2 object-cover mx-auto" source={require("../../assets/images/react-logo.png")} />
        {loading || trendsLoading ?
          (<ActivityIndicator size="large" color="#0000ff" className="my-10 self-center" />)
          :
          error || trendsError ? (
            <Text className="text-red-500 text-center">Error Loading Movies</Text>
          )
            :
            (
              <View className="flex-1 mt-5">
                <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" />
                <View className="">
                  <Text className="text-lg font-medium mt-5 mb-3 text-white font-poppins">
                    Trending Movies
                  </Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={()=> <View className="w-4" />}
                    data={trendingMovies}
                    renderItem={({ item, index }) => (
                      <TrendingCard {...item} index={index} />
                    )}
                    keyExtractor={item => item.movie_id.toString()}
                  />
                </View>
                <View>
                  <Text className="text-lg font-medium mt-5 mb-3 text-white font-poppins">
                    Popular Movies
                  </Text>
                  <FlatList
                    data={movies}
                    renderItem={({ item }: any) => (
                      <MovieCard {...item} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{
                      marginBottom: 100
                    }}
                    columnWrapperStyle={{
                      justifyContent: "flex-start",
                      gap: 20,
                      marginBottom: 18
                    }}
                    ListFooterComponent={
                      <>
                        <View className="mt-2">
                          <Text className="text-white text-center font-poppins">Built by Timilehin</Text>
                        </View>
                      </>
                    }
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