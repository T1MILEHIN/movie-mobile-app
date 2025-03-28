import { Client, Databases, ID, Query } from "react-native-appwrite"

interface TrendingMovie {
    id: string;
    searchTerm: string;
    movie_id: number;
    title: string;
    count: number;
    poster_url: string;
}

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTIONS_ID!


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client)


export const updateSearchCount = async (query: string, movie: any) => {
    try {
        const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", query)
        ])
        if (results.documents.length > 0) {
            const existimgMovie = results.documents[0]

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existimgMovie.$id,
                {
                    count: existimgMovie.count + 1
                }
            )
        } else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    title: movie.title,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            )
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getTrendingMovie = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])
        return results.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error)
        return undefined;
    }
}