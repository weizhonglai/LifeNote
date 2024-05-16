import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteDetailScreen = ({route, navigation}) => {
  const {note} = route.params;
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(note.content);
  const [charCount, setCharCount] = useState(note.content.length);

  useEffect(() => {
    navigation.setOptions({title: 'Note'});
  }, [navigation]);

  const handleTextChange = text => {
    const newLength = text.length;
    if (newLength <= 200) {
      setContent(text);
      setCharCount(newLength); // Updates character count
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleSave = async () => {
    const notesJson = await AsyncStorage.getItem('notes');
    let notes = notesJson ? JSON.parse(notesJson) : [];
    const noteIndex = notes.findIndex(n => n.id === note.id);
    if (noteIndex !== -1) {
      notes[noteIndex].content = content;
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      setEditMode(false);
      navigation.goBack(); // Optionally navigate back or give feedback
    }
  };

  const handleDelete = async () => {
    const performDeletion = async () => {
      const notesJson = await AsyncStorage.getItem('notes');
      let notes = notesJson ? JSON.parse(notesJson) : [];
      notes = notes.filter(n => n.id !== note.id);
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      navigation.goBack();
    };

    Alert.alert(
      'Confirm Delete', // Title of the dialog
      'Are you sure you want to delete this note?', // Message of the dialog
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion canceled'), // Log or handle cancellation
          style: 'cancel', // Style of the cancel button
        },
        {
          text: 'Delete',
          onPress: () => performDeletion(), // Call the function to delete the note
          style: 'destructive', // Style of the delete button (iOS specific)
        },
      ],
      {cancelable: true}, // Whether the dialog is cancelable
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{formatDate(note.created_at)}</Text>
        {editMode ? (
          <TouchableOpacity onPress={() => setEditMode(false)}>
            <MaterialCommunityIcons name="close" color="#FFFFFF" size={24} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setEditMode(true)}>
            <MaterialCommunityIcons name="pencil" color="#FFFFFF" size={24} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleDelete}>
          <MaterialCommunityIcons name="trash-can" color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>
      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            value={content}
            multiline
            numberOfLines={4}
            onChangeText={handleTextChange}
          />
          <Text style={styles.charCount}>{charCount}/200</Text>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.title}>{content}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#340E59',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    color: '#FFFFFF',
    backgroundColor: '#522D6D',
    padding: 10,
    marginBottom: 10,
  },
  charCount: {
    fontSize: 14,
    color: '#FFFFFF',
    alignSelf: 'flex-end', // Right-align the character count
  },
  button: {
    padding: 10,
    backgroundColor: '#E70D6F',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default NoteDetailScreen;
