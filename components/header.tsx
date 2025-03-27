import { View, Text, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View className=''>
        <Image width={100} height={100} className='mx-auto' source={require("../../assets/images/react-logo.png")} />
    </View>
  )
}

export default Header;