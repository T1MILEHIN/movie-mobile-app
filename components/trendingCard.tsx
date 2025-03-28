import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';

interface TrendingCardInterface {
    movie_id: number;
    title: string;
    poster_url: any;
    count: number;
    index: number;
}

const TrendingCard = ({movie_id, title, poster_url, count, index}: TrendingCardInterface) => {
  return (
    <Link href={`/`} asChild>
        <TouchableOpacity className='w-36 relative'>
            <Image 
                className="w-36 h-48 rounded-lg"
                source={{
                    uri: poster_url
                }}
                resizeMode="cover"
            />
            <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
                <MaskedView 
                    maskElement={
                        <Text className='text-white font-bold text-6xl font-[Poppins]'>{index + 1}</Text>
                    }
                />
            </View>
            <Text className='text-gray-300 text-sm font-bold mt-2' numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard