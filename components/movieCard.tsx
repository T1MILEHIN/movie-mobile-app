import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

interface MovieCardInterface {
    id: number;
    title: string;
    poster_path: string;
    vote_average: any;
    vote_count: any;
    release_date: any;
}

const MovieCard = ({ id, title, poster_path, vote_average, release_date }: MovieCardInterface) => {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[47%] sm:w-[30%]'>
                <Image source={{
                    uri: poster_path ?
                    `https://image.tmdb.org/t/p/w500${poster_path}`
                    :
                    `https://placeholde.co/600x400/1a1a1a/ffffff.png`
                }}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'
                />
                <Text numberOfLines={1} className='text-white text-sm font-semibold mt-2 font-poppins'>{title}</Text>
                <View className='flex-row items-center justify-start gap-x-1'>
                    <Ionicons name="star" size={10} color="gold" />
                    <Text className='text-white text-xs font-bold'>{Math.round(vote_average / 2)}</Text>
                </View>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-slate-400 text-xs font-medium mt-1'>{release_date?.split('-')[0]}</Text>
                    {/* <Text></Text> */}
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard