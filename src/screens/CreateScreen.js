import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, Image, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { THEME } from '../theme'
import { useDispatch } from 'react-redux'
import { addPost } from '../store/actions/post';
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('')
  const imgRef = useRef()

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imgRef.current,
      booked: false
    }
    dispatch(addPost(post))
    navigation.navigate('Main')
  }
  const photoPickHandler = (uri) => {
    imgRef.current = uri
  }


  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>CreateScreen</Text>
          <TextInput
            style={styles.textArea}
            placeholder='Input post title'
            value={text} onChangeText={setText}
            multiline />
          <PhotoPicker onPick={photoPickHandler} />
          <Button title="Create post" color={THEME.MAIN_COLOR} onPress={saveHandler} disabled={!text} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10
  },
  textArea: {
    marginVertical: 10
  }
})