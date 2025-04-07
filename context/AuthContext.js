import React, {
    useContext,
    createContext,
    useState,
    useEffect,
} from "react";
import { SafeAreaView } from "react-native";
import { account } from "@/services/appwrite";
import { ActivityIndicator } from "react-native";
import { ID } from "react-native-appwrite";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        checkAuth();
    };

    const checkAuth = async () => {
        try {
            const responseSession = await account.getSession("current");
            setSession(responseSession)
            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const register = async ({ email, password, name }) => {
        setLoading(true);
        try {
            await account.create(ID.unique(), email, password, name);
    
            const responseSession = await account.createEmailPasswordSession(email, password);
            setSession(responseSession);
    
            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            console.log("Register error:", error);
        }
        setLoading(false);
    };

    const signin = async ({ email, password }) => {
        setLoading(true);
        try {
            const responseSession = await account.createEmailPasswordSession(
                email,
                password
            );
            console.log(responseSession)
            setSession(responseSession);
            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const signout = async () => {
        setLoading(true);
        await account.deleteSession("current");
        setSession(null);
        setLoading(false);
    };

    const contextData = { session, user, register, signin, signout };
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <SafeAreaView>
                    <ActivityIndicator size="large" color="#0000ff" className="my-10 self-center" />
                </SafeAreaView>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };