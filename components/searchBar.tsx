import { View, Text, TextInput} from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";


interface SearchBarInterface {
  onPress: ()=> void
  placeholder: string
}

const SearchBar = ({onPress, placeholder}: SearchBarInterface) => {
  return (
    <View className="flex flex-row gap-2">
        <Ionicons name="search-circle-outline" size={30} color="white" />
        <TextInput 
          placeholder={placeholder}
          onPress={onPress}
          value=''
          onChangeText={()=> {}}
          className='flex-1 text-white pl-2 border-2 rounded-sm border-[#808080] outline-1 focus:outline-2 outline-white'
        />
    </View>
  )
}

export default SearchBar