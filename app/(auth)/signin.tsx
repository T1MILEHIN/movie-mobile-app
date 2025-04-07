import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
import TextCustom from '@/components/TextCustom'
import { styles } from '../../styles/authStyles'
import { Link } from 'expo-router'


const signin = () => {
    const { session, signin } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        signin({ email, password })
    }

    if (session) return <Redirect href="/" />

    return (

        <View style={styles.container}>
            <View>
                <TextCustom style={styles.headline} fontSize={72}>SignIn</TextCustom>
                <TextCustom>Email</TextCustom>
                <TextInput
                    placeholder='Enter your email...'
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <TextCustom>Password</TextCustom>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.button}
                    className='bg-accent'
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text className='my-1 text-center'>or</Text>
                <TouchableOpacity className="text-xl bg-white rounded-md mt-2 shadow-sm p-3 text-center">
                    <Text className='text-center font-poppins'>Signin with google</Text>
                </TouchableOpacity>
                <Text className="mt-2 text-sm font-medium font-poppins">Don't have an account <Link className='underline text-accent' href={"/(auth)/register"}>create an account</Link> </Text>
            </View>
        </View>

    )
}

export default signin