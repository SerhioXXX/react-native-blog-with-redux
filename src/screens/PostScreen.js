import React, { useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { removePost, toggleBooked } from '../store/actions/post';
import { THEME } from '../theme'

export const PostScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const postId = route.params?.postId ?? 'default postId';
  const date = route.params?.date ?? 'default date';

  const post = useSelector(state => state.post.allPosts.find(p => p.id === postId))

  const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))

  useEffect(() => {
    navigation.setParams({ booked })
  }, [booked])

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(postId))
  }, [dispatch, postId])

  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [toggleHandler])



  const removeHandler = () => {
    Alert.alert(
      'Delete post',
      'Are you shure?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete', style: 'destructive', onPress: () => {
            navigation.navigate('Main')
            dispatch(removePost(postId))
          }
        }
      ],
      { cancelable: false }
    );
  }
  if (!post) {
    return null;
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