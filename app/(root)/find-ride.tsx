import React from "react";
import CustomButton from "@/components/CustomButton";
import CustomAutocomplete from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { Text, View } from "react-native";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
    userState,
    userCountryCode,
  } = useLocationStore();

  const handleUserLocationPress = ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    const location = {
      latitude,
      longitude,
      address,
      userState: userState ?? "",
      userCountryCode: userCountryCode ?? "NG",
    };

    console.log("destination location", location);

    setUserLocation(location);
  };

  const handleDestinationLocationPress = ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    const location = {
      latitude,
      longitude,
      address,
      userState: userState ?? "",
      userCountryCode: userCountryCode ?? "NG",
    };

    console.log("destination location", location);

    setDestinationLocation(location);
  };
  return (
    <RideLayout title="Ride" snapPoints={["85%"]}>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <CustomAutocomplete
          icon={icons.target}
          initialLocation={userAddress ?? ""}
          containerStyle="bg-[#f5f5f5]"
          handlePress={handleUserLocationPress}
        />
      </View>

      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <CustomAutocomplete
          icon={icons.map}
          initialLocation={destinationAddress ?? ""}
          containerStyle="bg-[#f5f5f5]"
          handlePress={handleDestinationLocationPress}
        />
      </View>

      <CustomButton
        title="Find now"
        onPress={() => router.push("/(root)/confirm-ride")}
        className="mt-5 bg-gray-700"
      />
    </RideLayout>
  );
};

export default FindRide;
