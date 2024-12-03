import React, { useCallback, useState, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  ViewStyle,
  TextStyle,
  StyleProp,
  Image,
} from "react-native";
import { debounce } from "lodash";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const CustomAutocomplete = ({
  containerStyle,
  inputStyle,
  initialLocation,
  handlePress,
  icon,
  textInputBackgroundColor,
}: GoogleInputProps) => {
  const { userState, userCountryCode } = useLocationStore();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  console.log(userState, userCountryCode);

  const fetchLocations = async (
    queryStr: string,
    state: string,
    userCountryCode: string
  ) => {
    if (queryStr.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetchAPI(
        `/(api)/search?query=${queryStr}&state=${state}&code=${userCountryCode}`,
        {
          method: "GET",
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setSuggestions([]);
    }
  };

  const debouncedFetchLocations = useCallback(
    debounce(fetchLocations, 300),
    []
  );

  const handleTextChange = (text: string) => {
    setQuery(text);
    debouncedFetchLocations(text, userState, userCountryCode);
  };

  const handleSelectItem = (item: any) => {
    setQuery(item.display_name);
    setSuggestions([]);
    handlePress({
      latitude: Number(item.lat!),
      longitude: Number(item.lon!),
      address: item.display_name!,
      // userState: item.state!,
      // userCountryCode: item.country_code!,
    });
    Keyboard.dismiss();
  };

  return (
    <View
      className={`flex flex-row items-center justify-start relative z-50  mb-5 ${containerStyle} w-full p-3 rounded-xl shadow-sm shadow-gray-400`}
    >
      <View>
        <Image
          source={icon}
          className="w-4 h-4"
          alt="Search icon"
          resizeMode="contain"
        />
      </View>
      <TextInput
        ref={inputRef}
        value={query}
        onChangeText={handleTextChange}
        onFocus={() => setIsFocused(true)}
        placeholder={initialLocation ?? "Where do you want to go?"}
        className={`w-[95%] placeholder:text-gray-400 text-black ${textInputBackgroundColor} rounded- ml-[7px] truncate `}
        autoCorrect={false}
        autoCapitalize="none"
        numberOfLines={1}
        maxLength={80}
      />

      {isFocused && suggestions.length > 0 && (
        <View className="absolute top-[100%] left-0 right-0 bg-[#fff] rounded-[8px]  mt-[25px] shadow-[#000] shadow-[0px_2px_3.84px_rgba(0,0,0,0.25)]">
          <FlatList
            data={suggestions}
            keyboardShouldPersistTaps="always"
            keyExtractor={(item, index) => `${item.place_id}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-[12px] border-b-[1px] border-[#eee]"
                // onPress={() => handleSelectItem(item)}
                // onPress={() => onSelectLocation?.(item)}
                onPress={() => handleSelectItem(item)}
                activeOpacity={0.7}
              >
                <Text numberOfLines={2} className="font-[14px] text-[#333]">
                  {item.display_name}
                </Text>
              </TouchableOpacity>
            )}
            className="rounded-[8px]"
          />
        </View>
      )}
    </View>
  );
};

export default CustomAutocomplete;
