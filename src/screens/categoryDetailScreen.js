import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect

const CategoryDetail = ({route, navigation}) => {
  const {category, categoryName} = route.params;
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    navigation.setOptions({title: categoryName});
  }, [categoryName, navigation]);

  const fetchNotes = async () => {
    const notesJson = await AsyncStorage.getItem('notes');
    const allNotes = notesJson ? JSON.parse(notesJson) : [];
    allNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const filteredNotes = allNotes.filter(note => note.category === category);
    setNotes(filteredNotes);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes(); // Call fetchNotes each time the screen is focused
    }, [category]),
  );

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

  return (
    <ScrollView style={styles.container}>
      {notes.map((note, index) => (
        <TouchableOpacity
          key={index}
          style={styles.noteContainer}
          onPress={() => navigation.navigate('NoteDetail', {note})}>
          <Text style={styles.noteDate}>{formatDate(note.created_at)}</Text>
          <Text style={styles.noteContent}>{note.content}</Text>
        </TouchableOpacity>
      ))}
      {notes.length === 0 && (
        <Text style={styles.noNotes}>
          No notes available for this category.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#340E59',
    padding: 10,
  },
  noteContainer: {
    backgroundColor: '#522D6D',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteDate: {
    fontSize: 12,
    color: '#FFFFFF',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  noNotes: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CategoryDetail;
