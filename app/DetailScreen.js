import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Animated, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

const FONT_SIZES = [14, 16, 18, 20, 22, 24, 26, 28, 36, 72]; // Array of selectable font sizes

export default function DetailScreen({ navigation }) {
  const [entryText, setEntryText] = useState('');
  const [fallAnimation] = useState(new Animated.Value(0));
  const [selectedFontSize, setSelectedFontSize] = useState(FONT_SIZES[2]); // Default font size



  useEffect(() => {
    // Trigger animation when screen mounts
    const animatePaperFalling = () => {
        Animated.timing(fallAnimation, {
          toValue: 1,
          duration: 1500, // Adjust duration as needed
          useNativeDriver: true,
        }).start();
      };
  
      animatePaperFalling();
  }, []);

  const getCurrentDateKey = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };
  
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        // Get today's entry from AsyncStorage
        const dateKey = getCurrentDateKey();
        const savedEntry = await AsyncStorage.getItem(`entry_${dateKey}`);
        if (savedEntry !== null) {
          setEntryText(savedEntry);
        }
      } catch (error) {
        console.error('Error fetching entry:', error.message);
        // Handle error fetching entry
      }
    };

    fetchEntry();
  }, []);

  useEffect(() => {
    const saveEntryWithDelay = setTimeout(() => {
      saveEntry();
    }, 1000); // Adjust delay duration as needed (e.g., 1000ms = 1 second)

    // Cleanup function to clear timeout
    return () => clearTimeout(saveEntryWithDelay);
  }, [entryText]);

  const saveEntry = async () => {
    try {
      // Validate entryText
    //   if (!entryText.trim()) {
    //     Alert.alert('Empty Entry', 'Please write something before saving.');
    //     return;
    //   }
      const dateKey = getCurrentDateKey();
      await AsyncStorage.setItem(`entry_${dateKey}`, entryText.trim());
      console.log('Entry saved:', entryText.trim());
    } catch (error) {
      console.error('Error saving entry:', error.message);
      // Handle error saving entry
    }
  };

  const handleFontSizeChange = (fontSize) => {
    setSelectedFontSize(fontSize);
  };

  
  return (
    <View style={styles.container}>
        <Animated.View style={[styles.paperContainer, 
        { transform: [{ translateY: fallAnimation.interpolate({ inputRange: [0, 1], outputRange: [-500, 0] }) }] }]}>
        
        <Image source={require('../assets/images/paper.png')} style={styles.paperImage} />
        
      <TextInput
        style={[styles.input, {fontSize: selectedFontSize}]}
        multiline
        //placeholder="Write your diary entry here..."
        value={entryText}
        onChangeText={setEntryText}
        //autoFocus={true} // Ensure text input is focused when screen opens
        textAlignVertical="top" // Align text vertically to the top
        //fontSize = {20}
      />
      
      </Animated.View>
      <View style={styles.fontSizePicker}>
        <Picker
          selectedValue={selectedFontSize}
          onValueChange={(itemValue) => handleFontSizeChange(itemValue)}
          mode="dropdown"
        >
          {FONT_SIZES.map((size, index) => (
            <Picker.Item key={index} label={`${size}`} value={size} />
          ))}
        </Picker>
      </View>
      {/* <Button
        title="Save Entry"
        onPress={handleSaveEntry}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff', // Background color of the screen
    },
    paperContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    paperImage: {
      width: '80%',
      aspectRatio: 0.4, // Aspect ratio of your paper image
      resizeMode: 'contain',
    },
    input: {
      position: 'absolute',
      top: '15%', // Adjust position as needed
      width: '90%',
      height: '75%',
      borderWidth: 0,
      borderColor: '#ccc',
      padding: 10,
      //backgroundColor: 'transparent', // Make TextInput transparent
    },
    fontSizePicker: {
        marginTop: 20,
        width: '50%',
        borderWidth: 1,
        borderColor: '#ccc',
      }
  });
