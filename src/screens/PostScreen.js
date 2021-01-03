import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';
import { DATA } from '../data';
import { THEME } from '../theme'

export const PostScreen = ({ navigation, route }) => {
  const postId = route.params?.postId ?? 'default postId';
  const date = route.params?.date ?? 'default date';

  const post = DATA.find(p => p.id === postId)

  const removeHandler = () => {
    Alert.alert(
      'Delete post',
      'Are you shure?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrapper} >
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title='Delete' color={THEME.DANGER_COLOR} onPress={removeHandler} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  textWrapper: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  }
})