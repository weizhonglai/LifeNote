import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';
import {Alert} from 'react-native';
import styles from './utils/style';

const AddScreen = () => {
  const [category, setCategory] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = text => {
    if (text.length <= 200) {
      setNoteContent(text);
      setCharCount(text.length); // Updates character count
    }
  };

  const handleSavePress = async () => {
    if (!category) {
      Alert.alert('Error', 'Please select a category before saving.');
      return;
    }

    if (!noteContent.trim()) {
      Alert.alert('Error', 'Please key in something to save.');
      return;
    }

    await saveNote(category, noteContent);
    // Optionally reset the state or give user feedback
    setNoteContent('');
    setCharCount(0);
    Alert.alert('Success', 'Note saved successfully!');
  };

  const saveNote = async (category, noteContent) => {
    try {
      const newNote = {
        id: uuidv4(),
        category: category,
        content: noteContent,
        created_at: new Date().toISOString(),
      };

      // Retrieve existing notes from AsyncStorage
      const existingNotes = await AsyncStorage.getItem('notes');
      const notes = existingNotes ? JSON.parse(existingNotes) : [];
      notes.push(newNote);

      // Save updated notes array back to AsyncStorage
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Failed to save the note', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <Text style={styles.headerTitle}>New Note</Text>
        <RNPickerSelect
          onValueChange={value => setCategory(value)}
          items={[
            {label: 'Work and Study', value: 'work_and_study'},
            {label: 'Life', value: 'life'},
            {label: 'Health and Wellness', value: 'health_and_wellness'},
          ]}
          style={pickerSelectStyles}
          placeholder={{label: 'Choose a category', value: null}}
          useNativeAndroidPickerStyle={false}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Please input note content"
          placeholderTextColor="#ccc"
          multiline
          numberOfLines={4}
          onChangeText={handleTextChange}
          value={noteContent}
        />
        <Text style={styles.charCount}>{charCount}/200</Text>
        <TouchableOpacity style={styles.button} onPress={handleSavePress}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#522D6D',
    marginBottom: 20,
  },
});

export default AddScreen;
