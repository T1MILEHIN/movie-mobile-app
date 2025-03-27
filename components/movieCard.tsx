import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

interface MovieCardInterface {
    id: number;
    title: string;
    poster_path: string;
    vote_average: any;
    release_date: any;
}

const MovieCard = ({ id, title, poster_path, vote_average, release_date }: MovieCardInterface) => {
    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity>
                <Image source={{
                    uri: poster_path ?
                    `https://image.tmdb.org/t/p/w500${poster_path}`
                    :
                    `https://placeholde.co/600x400/1a1a1a/ffffff.png`
                }}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'
                />
            </TouchableOpacity>
            <Text>MovieCard</Text>
        </Link>
    )
}

export default MovieCard