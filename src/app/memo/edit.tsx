import {
  View, TextInput, StyleSheet
} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { getDoc, setDoc, Timestamp, doc } from 'firebase/firestore'

import CircleButton from '../../components/circleButton'
import Icon from '../../components/icon'
import { auth, db } from '../../config'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'

const handlePress = (id: string, bodyText: string): void => {
  if (auth.currentUser === null) { return }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
  setDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      router.back()
    })
    .catch((error) => {
      console.log(error)
    })
}
const Edit = (): JSX.Element => {
  const id = String(useLocalSearchParams().id)
  const [bodyText, setBodyText] = useState('')

  useEffect(() => {
    if (auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    getDoc(ref)
      .then((docRef) => {
        const remoteBodyText = docRef?.data()?.bodyText
        setBodyText(String(remoteBodyText))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput autoFocus onChangeText={(text) => { setBodyText(text) }} multiline style={styles.input} value={bodyText} />
            </View>
            <CircleButton onPress={() => { handlePress(id, bodyText) }}>
                <Icon name="check" size={40} color="#ffffff" />
            </CircleButton>
        </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    flex: 1
  },
  input: {
    textAlignVertical: 'top',
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 27
  }
})

export default Edit
