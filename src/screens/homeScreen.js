import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categoryMapping = {
  'work_and_study': 'Work and Study',
  'life': 'Life',
  'health_and_wellness': 'Health and Wellness'
};

const HomeScreen = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const notesJson = await AsyncStorage.getItem('notes');
                const notes = notesJson ? JSON.parse(notesJson) : [];
                // 组织笔记数据，并限制每个类别只显示三个最新笔记
                const categoriesMap = notes.reduce((acc, note) => {
                    const { category, content, created_at } = note;
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(note);
                    return acc;
                }, {});

                // 对每个类别的笔记按 created_at 降序排序，并只保留最新的三条
                Object.keys(categoriesMap).forEach(key => {
                    categoriesMap[key].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    categoriesMap[key] = categoriesMap[key].slice(0, 3); // 只取最新的三个
                });

                setCategories(Object.entries(categoriesMap)); // 转换为数组供渲染
            } catch (error) {
                console.error('Failed to fetch notes', error);
            }
        };

        fetchNotes();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <FlatList
                data={categories}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.category}>
                    <Text style={styles.categoryTitle}>{categoryMapping[item[0]] || item[0]}</Text>
                    {item[1].map((note, index) => (
                        <View key={index} style={styles.noteContainer}>
                            <Text style={styles.noteText}>{note.content.substring(0, 20) + (note.content.length > 20 ? '...' : '')}</Text>
                        </View>
                    ))}
                  </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#340E59',
  },
  title: {
      fontSize: 24,
      color: '#FFFFFF',
      marginBottom: 20,
  },
  category: {
      marginBottom: 20,
  },
  categoryTitle: {
      fontSize: 20,
      color: '#E70D6F',
      marginBottom: 10,
  },
  noteContainer: {
      backgroundColor: '#522D6D',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginBottom: 5,
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
  },
  noteText: {
      color: '#FFFFFF',
      fontSize: 16,
  },
});

export default HomeScreen;
