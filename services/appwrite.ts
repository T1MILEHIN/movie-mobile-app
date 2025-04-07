import { Client, Account, Avatars, Databases, ID, Query } from "react-native-appwrite";
import { Platform } from "react-native";

interface TrendingMovie {
    id: string;
    searchTerm: string;
    movie_id: number;
    title: string;
    count: number;
    poster_url: string;
}

const platform = "com.timi_movie_app.app";
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTIONS_ID!
const USER_FAVOURITE_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_USER_FAVOURITE_ID!


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

switch (Platform.OS) {
    case "ios":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID!);
        break;
    case "android":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME!);
        break;
}

const account = new Account(client);
const avatar = new Avatars(client)
const database = new Databases(client);

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

export const checkIfFavourite = async (userId: string, movieId: any) => {
    const existing = await database.listDocuments(DATABASE_ID, USER_FAVOURITE_COLLECTION_ID, [
        Query.equal("userId", userId),
        Query.equal("movieId", movieId),
    ]);

    return existing.documents.length > 0;
};

export const addFavourite = async (userId: any, movie: any) => {
    try {
        const existing = await database.listDocuments(DATABASE_ID, USER_FAVOURITE_COLLECTION_ID, [
            Query.equal("userId", userId),
            Query.equal("movieId", movie.id),
        ])

        if (existing.total > 0) {
            await database.deleteDocument(
                DATABASE_ID,
                USER_FAVOURITE_COLLECTION_ID,
                existing.documents[0].$id
            );
            return { status: "removed", message: "Movie removed from favourites" };
        }

        await database.createDocument(
            DATABASE_ID,
            USER_FAVOURITE_COLLECTION_ID,
            ID.unique(),
            {
                userId,
                movieId: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }
        );
        return { status: "added", message: "Movie added to favourites" };
    } catch (error) {
        console.log(error)
        throw error;
    }

}

export const fetchUsersFavourite = async(userId: any) => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            USER_FAVOURITE_COLLECTION_ID,
            [
                Query.equal('userId', userId)
            ]
        );

        return result.documents; // Array of favourite movies
    } catch (error) {
        console.error("Error fetching favourites:", error);
        return [];
    }
}

export { avatar, account };