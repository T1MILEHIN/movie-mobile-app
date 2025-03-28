import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import useFetch from '@/services/useFetch'
import { fetchMovieDetail } from '@/services/api'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from "@expo/vector-icons";

interface MovieInfoInterface {
  label: string;
  value: any;
}

const MovieInfo = ({ label, value }: MovieInfoInterface) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-slate-200 texs-sm'>{label}</Text>
    <Text className='text-slate-100 font-bold text-sm mt-2 font-poppins'>{value || "N/A"}</Text>
  </View>
)

const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  const { data: movie, loading, error } = useFetch(() => fetchMovieDetail(id as string));

  if (loading) return <ActivityIndicator size="large" color="#0000ff" className="my-10 self-center" />

  return (
    <View className='bg-primary flex-1'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 90
        }}>
        <View className='relative'>
          <Image
            className="w-full h-96"
            source={{
              uri: movie?.poster_path ?
                `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                :
                `https://placeholde.co/600x400/1a1a1a/ffffff.png`
            }}
          />
          <View className="absolute -bottom-6 right-5">
            <Ionicons name='play' size={40} color="white" />
          </View>
        </View>
        <View className='flex-col  items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl font-poppins'>{movie?.title}</Text>
          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-gray-200 text-sm font-poppins'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-gray-200 text-sm'>{movie?.runtime}m</Text>
          </View>
          <View className='flex-row items-center bg-slate-900 px-2 py-1 rounded-md gap-x-1 mt-2'>
            <Ionicons name="star" size={10} color="gold" />
            <Text className='font-bold text-white text-sm font-poppins'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
            <Text className='text-slate-200 text-sm'>({movie?.vote_count}) votes</Text>
          </View>
          <MovieInfo label='Overview' value={movie?.overview} />
          <MovieInfo label='Genres' value={movie?.genres?.map((g:any) => g.name).join(" - ") || "N/A"} />
          <View className='flex flex-row justify-between w-full'>
            <MovieInfo label='Budget' value={`$${movie?.budget / 1_000_000} million`} />
            <MovieInfo label='Revenue' value={`$${movie?.revenue / 1_000_000}`} />
          </View>
          <MovieInfo label='Productio Companies' value={movie?.production_companies?.map((c:any) => c.name).join(" - ") || "N/A"} />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={router.back} className='absolute bottom-5 left-0 right-0 bg-accent rounded-lg py-3.5 flex-row items-center justify-center gap-x-1 z-50'>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text className='font-semibold text-white text-base'>Go Back</Text>

      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails