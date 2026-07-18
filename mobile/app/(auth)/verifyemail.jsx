import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuthStore } from "../../store/authStore";

export default function VerifyEmail() {
    const [code, setCode] = useState("");
    const { email } = useLocalSearchParams();
    const { verifyEmail } = useAuthStore();

    const router = useRouter();

    const handleVerify = async () => {
        try {
            const result = await verifyEmail({
                email,
                code,
            });

            if (result.success) {
                Toast.show({
                    type: "success",
                    text1: "Verified",
                    text2: "Your email has been verified",
                });

                setTimeout(() => {
                    router.replace("/(tabs)");
                }, 1000);

            } else {
                Toast.show({
                    type: "error",
                    text1: "Verification Failed",
                    text2: result.error,
                });
            }

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Something went wrong",
            });
        }
    };



    return (
        <View>
            <TextInput
                placeholder="Enter Code"
                value={code}
                onChangeText={setCode}
            />

            <Button
                title="Verify"
                onPress={handleVerify}
            />
        </View>
    );
}