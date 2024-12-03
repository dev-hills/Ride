import { icons } from "@/constants";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const RideLayout = ({
  children,
  title,
  snapPoints,
}: {
  children: React.ReactNode;
  title?: string;
  snapPoints?: string[];
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-full bg-blue-500">
          <View className="flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>

            <Text className="text-xl font-JakartaSemiBold ml-5">
              {title || "Go back"}
            </Text>
          </View>
          <Map />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["50%", "85%"]}
          index={0}
          style={{ borderRadius: 50, flex: 1, padding: 20 }}
          handleIndicatorStyle={{ backgroundColor: "gray" }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
