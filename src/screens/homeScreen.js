import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import {categoryMapping} from './utils/categories';
import styles from './utils/style';

const HomeScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);

  // Define the function to fetch notes
  const fetchNotes = async () => {
    try {
      const notesJson = await AsyncStorage.getItem('notes');
      const notes = notesJson ? JSON.parse(notesJson) : [];
      const categoriesMap = notes.reduce((acc, note) => {
        const {id, category, content, created_at} = note;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({id, content, created_at});
        return acc;
      }, {});

      Object.keys(categoriesMap).forEach(key => {
        categoriesMap[key].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        categoriesMap[key] = categoriesMap[key].slice(0, 3);
      });

      setCategories(Object.entries(categoriesMap));
    } catch (error) {
      console.error('Failed to fetch notes', error);
    }
  };

  // Use useFocusEffect to run fetchNotes each time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchNotes();
    }, []),
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <MaterialCommunityIcons
            name="book-settings"
            color="#FFFFFF"
            size={24}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>
              {categoryMapping[item[0]] || item[0]}
            </Text>
            {item[1].map((note, index) => (
              <TouchableOpacity
                key={index}
                style={styles.noteContainer}
                onPress={() => navigation.navigate('NoteDetail', {note})}>
                <Text style={styles.noteText}>
                  {note.content.substring(0, 30) +
                    (note.content.length > 30 ? '...' : '')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You haven't added any notes, add a new note to show here.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
