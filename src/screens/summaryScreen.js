import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {categoryMapping} from './utils/categories';
import {useFocusEffect} from '@react-navigation/native';
import styles from './utils/style';

const SummaryScreen = ({navigation}) => {
  const [summaryData, setSummaryData] = useState([]);

  const handleDetailPress = categoryKey => {
    navigation.navigate('CategoryDetail', {
      category: categoryKey,
      categoryName: categoryMapping[categoryKey] || categoryKey,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const notesJson = await AsyncStorage.getItem('notes');
        const notes = notesJson ? JSON.parse(notesJson) : [];

        const countByCategory = Object.keys(categoryMapping).reduce(
          (acc, key) => {
            acc[key] = 0; // Initialize each category count to 0
            return acc;
          },
          {},
        );

        notes.forEach(note => {
          if (note.category in countByCategory) {
            countByCategory[note.category]++;
          }
        });

        const dataArray = Object.entries(countByCategory).map(
          ([key, count]) => ({
            categoryKey: key,
            category: categoryMapping[key] || key,
            count: count,
          }),
        );

        setSummaryData(dataArray);
      };

      fetchData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Summary</Text>
      <FlatList
        data={summaryData}
        keyExtractor={item => item.categoryKey}
        renderItem={({item}) => (
          <View style={styles.noteContainer}>
            <Text style={styles.categoryTitle}>{item.category}</Text>
            <View style={styles.recordContainer}>
              <Text style={styles.recordCount}>
                This topic has a total of {item.count} records.
              </Text>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => handleDetailPress(item.categoryKey)}>
                <Text style={styles.buttonText}>Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles2 = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  itemContainer: {
    flexDirection: 'column',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#522D6D',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordCount: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  detailButton: {
    padding: 10,
    backgroundColor: '#E70D6F',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default SummaryScreen;
