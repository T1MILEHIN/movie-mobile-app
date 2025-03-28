import { ActivityIndicator, View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFetch from '@/services/useFetch'
import MovieCard from '@/components/movieCard'
import { fetchMovies } from '@/services/api'
import SearchBar from '@/components/searchBar'
import { updateSearchCount } from '@/services/appwrite'

interface Movie {
  id: number;
  title: string;
  releaseDate: string;
}

const search = () => {
  const [searchParam, setSearchParam] = useState("")
  const { data: movies = [], loading, refetch: searchMovie, reset, error } = useFetch(() => fetchMovies({ query: searchParam }), false)

  useEffect(() => {
    const timeoutId = setTimeout(async() => {
      if (searchParam.trim()) {
        await searchMovie();
      } else {
        reset()
      }
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchParam])

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchParam, movies[0]);
    }
  }, [movies]);


  return (
    <View className="flex-1 bg-primary">
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
        className='px-5'
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View>
              <Image className="size-2 object-cover mx-auto" source={require("../../assets/images/react-logo.png")} />
            </View>
            <View className='mt-5'>
              <SearchBar
                placeholder='Search movie...'
                value={searchParam}
                onChangeText={(text: string) => setSearchParam(text)}
              />
            </View>
            {
              loading &&
              (<ActivityIndicator size="large" color="#0000ff" className="my-10 self-center" />)
            }
            {
              error && (
                <Text className="text-red-500 text-center mt-4 font-poppins">Error Searching Movies</Text>
              )
            }
            {
              !loading && !error && searchParam.trim() && movies?.length > 0 && (
                <Text className='text-white my-2 font-poppins'>Search Result for{' '}
                  <Text className='font-bold text-accent'>{searchParam}</Text>
                </Text>
              )
            }
          </>
        }
        ListEmptyComponent={
          !error && !loading ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchParam.trim() ? "No movie found" : "Search for a Movie"}
              </Text>
            </View>
          )
            :
            null
        }
      />
    </View>
  )
}

export default search