import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarInterface {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: SearchBarInterface) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} className="group flex flex-row items-center gap-2 p-2 border-2 rounded-md border-[#808080]">
      <Ionicons name="search" size={24} color="white" />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#bbb"
        className="flex-1 text-white focus:outline-none font-poppins"
      />
    </TouchableOpacity>
  );
};

export default SearchBar;
