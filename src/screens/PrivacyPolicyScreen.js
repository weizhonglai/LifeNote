import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Privacy Policy for LifeNote</Text>
      <Text style={styles.text}>
        At LifeNote, accessible from the LifeNote app, one of our main
        priorities is the privacy of our users. This Privacy Policy document
        contains types of information that is collected and recorded by LifeNote
        and how we use it.
      </Text>
      <Text style={styles.subHeader}>Information Collection And Use</Text>
      <Text style={styles.text}>
        For a better experience when using our application, LifeNote does not
        ask you to provide us with certain personally identifiable information,
        including the text entered into your notes. We do not collect it in any
        way.
      </Text>
      <Text style={styles.subHeader}>Local Storage</Text>
      <Text style={styles.text}>
        LifeNote stores all your data locally on your device. We do not transmit
        or store your information on any servers.
      </Text>

      <Text style={styles.subHeader}>Data Protection</Text>
      <Text style={styles.text}>
        As we do not store or transmit your data, protection of such data relies
        solely on the security measures of your device. We encourage users to
        regularly update their operating system and use security features
        provided by their device manufacturer to enhance the protection of their
        stored data.
      </Text>
      <Text style={styles.subHeader}>Changes to This Privacy Policy</Text>
      <Text style={styles.text}>
        We may update our Privacy Policy from time to time. Thus, you are
        advised to review this page periodically for any changes. We will notify
        you of any changes by posting the new Privacy Policy on this page.
      </Text>
      <Text style={styles.subHeader}>Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to contact us at:
      </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('mailto:weizhonglai0403@gmail.com')}>
        Email: weizhonglai0403@gmail.com
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
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingTop: 10,
  },
  link: {
    fontSize: 16,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    paddingTop: 10,
  },
  link: {
    fontSize: 16,
    color: '#E70D6F',
    marginBottom: 50,
  },
});

export default PrivacyPolicyScreen;
