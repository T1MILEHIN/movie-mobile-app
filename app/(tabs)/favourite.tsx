import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import useFetch from '@/services/useFetch'
import { useAuth } from '@/context/AuthContext'
import { fetchUsersFavourite } from '@/services/appwrite';
import MovieCard from '@/components/movieCard';

const favourite = () => {
  const { user } = useAuth();
  console.log(user)
  const { data: fav = [], error, loading } = useFetch(() => fetchUsersFavourite(user.$id))
  console.log(fav)
  return (
    <ScrollView className="flex-1 bg-primary py-3"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        minHeight: "100%"
      }}>
      <FlatList
        data={fav}
        renderItem={({ item }: any) => (
          <MovieCard {...item} movieId={item.movieId} poster_url={item.poster_url} />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          marginBottom: 20
        }}
        className='p-5'
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <Text className=' text-4xl font-medium font-poppins text-white'>Favourites</Text>
            {
              loading &&
              (<ActivityIndicator size="large" color="#0000ff" className="my-10 self-center" />)
            }
            {
              error && (
                <Text className="text-red-500 text-center mt-4 font-poppins">Error Loading Favourite</Text>
              )
            }
            {
              !loading && !error && fav && fav.length > 0 && (
                <Text className='text-white my-2 font-poppins'>No of Favourites{' '}
                  <Text className='font-bold text-accent'>{fav?.length}</Text>
                </Text>
              )
            }
          </>
        }
        ListEmptyComponent={
          !error && !loading ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                You don't have any favourite
              </Text>
            </View>
          )
            :
            null
        }
      />
    </ScrollView>
  )
}

export default favourite