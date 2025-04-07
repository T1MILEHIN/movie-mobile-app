import { ScrollView, View, TextInput, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
import TextCustom from '@/components/TextCustom'
import { Link } from 'expo-router'
import { styles } from '../../styles/authStyles'

const register = () => {
    const { session, register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        register({ name, email, password });
    }

    if (session) {
        return <Redirect href="/" />;
    }

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                minHeight: "100%"
            }}>
            <View style={styles.registerContainer} className=''>
                <TextCustom style={styles.registerHeadline} fontSize={72}>Register</TextCustom>
                <TextCustom>Fullname</TextCustom>
                <TextInput
                    placeholder='Enter your fullName'
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextCustom>Email</TextCustom>
                <TextInput
                    placeholder='Enter your email...'
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextCustom>Phone Number</TextCustom>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    value={phoneNo}
                    onChangeText={(text) => setPhoneNo(text)}
                />
                <TextCustom>Password:</TextCustom>
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
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
                <Text className='my-2 text-center'>or</Text>
                <TouchableOpacity className="text-xl bg-white rounded-md mt-2 shadow-md p-3 text-center">
                    <Text className='text-center font-poppins'>Signin with google</Text>
                </TouchableOpacity>
                <Text className="mt-2 text-sm font-medium font-poppins">Already have an account <Link className='underline text-accent' href={"/(auth)/signin"}>create an account</Link> </Text>
            </View>
        </ScrollView>
    )
}


export default register