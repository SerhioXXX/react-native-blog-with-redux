import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native';

export const AboutScreen = ({ }) => {
  const description = 'AboutScreen description'
  return (
    <ScrollView >
      <View style={styles.center}>
        <Text>{description.repeat(150)}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})