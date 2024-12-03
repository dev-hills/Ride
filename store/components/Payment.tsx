import { Alert, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import React, { useRef } from "react";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { PaymentProps } from "@/types/type";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  const openPaymentSheet = async () => {};
  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey="pk_test_ac1f02d6ca822c93420f73bb382efe372217c803"
        billingEmail={email}
        amount={amount}
        onCancel={(e) => {
          // handle response here
          Alert.alert("Payment Cancelled", JSON.stringify(e));
        }}
        onSuccess={(res) => {
          // handle response here
          
          Alert.alert("Payment Successful", JSON.stringify(res));
        }}
        ref={paystackWebViewRef as any}
      />

      <CustomButton
        title="Confirm Ride"
        className="my-6"
        // onPress={openPaymentSheet}
        onPress={() => paystackWebViewRef.current?.startTransaction()}
      />
    </View>
  );
};

export default Payment;
