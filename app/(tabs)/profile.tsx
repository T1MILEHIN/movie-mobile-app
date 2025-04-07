import { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';


const profile = () => {
  const { user, session, signout } = useAuth();
  const [email, setEmail] = useState(user?.email ?? "");
  const [phoneNo, setPhoneNo] = useState(user?.phone ?? "");

  return (
    !session ? <Redirect href="/signin" /> :
      <ScrollView className=""
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%"
        }}>
        <View className="flex-1 bg-primary p-4">
          <Text className='text-4xl font-medium font-poppins text-white'>Profile</Text>
          <View className=''>
            <Text className="font-poppins text-white my-1">Hi {user?.name}</Text>
            <Text className='text-lg text-white font-poppins mb-2'>Email</Text>
            <TextInput
              className='border border-white text-white mb-2 h-10 pl-2 rounded-md'
              placeholder='Your email'
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text className='text-lg text-white font-poppins mb-2'>Phone No</Text>
            <TextInput
              className='border border-white text-white mb-2 h-10 pl-2 rounded-md'
              placeholder="Phone number"
              value={phoneNo}
              onChangeText={(text) => setPhoneNo(text)}
            />
            {/* <Text className='text-2xl text-white font-poppins mb-2'>Password</Text>
            <TextInput
              className='border border-white text-white mb-2 h-10 rounded-md'
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            /> */}
            <TouchableOpacity className='bg-accent'>
              <Text className='text-center p-3 text-white'>Update</Text>
            </TouchableOpacity>
          </View>
          <View className='mt-10'>
            <Text className='text-white font-poppins'>To log Out?</Text>
            <TouchableOpacity className='bg-red-500' onPress={signout}>
              <Text className='text-center p-3 text-white'>LogOut</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  )
}


export default profile;