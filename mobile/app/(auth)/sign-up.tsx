import { useAuth, useSignUp } from '@clerk/expo'
import { type Href, Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image, } from 'react-native'
import { COLORS } from "../../constants/colors";
import { authStyles } from "../../assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = React.useState('')

  const handleSubmit = async () => {
    const { error } = await signUp.password({
      emailAddress,
      password,
    })
    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }

    if (!error) await signUp.verifications.sendEmailCode()
  }

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    })
    if (signUp.status === 'complete') {
      await signUp.finalize({
        // Redirect the user to the home page after signing up
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask)
            return
          }

          const url = decorateUrl('/')
          if (url.startsWith('http')) {
            window.location.href = url
          } else {
            router.push(url as Href)
          }
        },
      })
    } else {
      // Check why the sign-up is not complete
      console.error('Sign-up attempt not complete:', signUp)
    }
  }

  if (signUp.status === 'complete' || isSignedIn) {
    return null
  }

  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address') &&
    signUp.missingFields.length === 0
  ) {

    //Verify
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Verify your account
        </Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        {errors.fields.code && (
          <Text style={styles.error}>{errors.fields.code.message}</Text>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            fetchStatus === 'fetching' && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleVerify}
          disabled={fetchStatus === 'fetching'}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
          onPress={() => signUp.verifications.sendEmailCode()}
        >
          <Text style={styles.secondaryButtonText}>I need a new code.</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 40}
        style={authStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >



          {/* Image Container */}
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/revenue-i4.png")}
              style={authStyles.image}
            // contentFit="contain"
            />
          </View>
          <Text style={authStyles.title}>Create Account</Text>
          <View style={authStyles.formContainer}>



            {/* Email Input */}


            <View style={authStyles.inputContainer}>
              <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Enter email"
                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                keyboardType="email-address"
                style={authStyles.textInput}
                placeholderTextColor={COLORS.textLight}
              />
              {errors.fields.emailAddress && (

                <Text style={styles.error}>{errors.fields.emailAddress.message}</Text>

              )}
            </View>


            {/* Password Input */}
            {/* <Text style={styles.label}>Password</Text> */}
            <View style={authStyles.inputContainer}>
              <TextInput
                value={password}
                placeholder="Enter password"
                onChangeText={(password) => setPassword(password)}
                style={authStyles.textInput}
                placeholderTextColor={COLORS.textLight}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              {errors.fields.password && (
                <Text style={styles.error}>{errors.fields.password.message}</Text>
              )}

              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>


            {/* Sign Up Button */}
            <Pressable
              style={({ pressed }) => [
                authStyles.authButton,
                (!emailAddress || !password || fetchStatus === 'fetching') && authStyles.buttonDisabled,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleSubmit}
              disabled={!emailAddress || !password || fetchStatus === 'fetching'}
            >
              <Text style={authStyles.buttonText}>Sign up</Text>
            </Pressable>

            {/* For your debugging purposes. You can just console.log errors, but we put them in the UI for convenience */}
            {/* {errors && <Text style={styles.debug}>{JSON.stringify(errors, null, 2)}</Text>} */}

            {/* Already have an account? Sign In */}
            <View style={authStyles.linkContainer}>
              <Text style={authStyles.linkText}>
                Already have an account?  <Link href="/sign-in">
                  <Text style={authStyles.link}>Sign In</Text>
                </Link>
              </Text>

            </View>



            {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
            {/* <View nativeID="clerk-captcha" /> */}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 14,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#8B593E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#8B593E',
    fontWeight: '600',
    fontSize: 17,
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    alignItems: 'center',
  },
  error: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 5,
  },
  debug: {
    fontSize: 10,
    opacity: 0.5,
    marginTop: 8,
  },
})