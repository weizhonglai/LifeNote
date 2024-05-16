import React from 'react';
import {ScrollView, Text, View, StyleSheet, Linking} from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>About LifeNote</Text>
      <Text style={styles.text}>
        LifeNote is designed to make daily note-taking simple and efficient.
        Whether you're a student, a professional, or anyone in between, LifeNote
        helps you organize your thoughts and tasks with ease. Our app supports
        categorization of notes into areas like Work & Study, Life, and Health &
        Wellness, enabling you to keep track of different aspects of your life
        efficiently.
      </Text>
      <Text style={styles.subHeader}>Developed by WeiZhong</Text>
      <Text style={styles.text}>
        LifeNote is developed with the aim to enhance productivity and simplify
        day-to-day tasks. we are dedicated to improving user experience and
        integrating valuable feedback into the development of our applications.
      </Text>
      <Text style={styles.subHeader}>Contact Us</Text>
      <Text style={styles.text}>
        For support or inquiries, please contact us at:
      </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('mailto:weizhonglai0403@google.com')}>
        Email: weizhonglai0403@gmail.com
      </Text>
      <Text style={styles.subHeader}>Acknowledgements</Text>
      <Text style={styles.text}>
        We would like to thank our users for their continuous support and
        valuable feedback.
      </Text>
      <Text style={styles.subHeader}>Stay Updated</Text>
      <Text style={styles.lastText}>
        For future updates and new features, keep an eye on our app updates
        section or subscribe to our newsletter.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#340E59',
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  lastText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 40,
  },
  link: {
    fontSize: 16,
    color: '#E70D6F',
    marginBottom: 16,
  },
});

export default AboutScreen;
