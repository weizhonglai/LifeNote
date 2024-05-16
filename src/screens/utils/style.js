import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  // Global styles
  container: {
    flex: 1,
    backgroundColor: '#340E59',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  subHeader: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  // Specific styles for HomeScreen
  homeTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginVertical: 20,
  },
  category: {
    marginBottom: 20,
  },
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  noteContainer: {
    backgroundColor: '#522D6D',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  noteText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  detailButton: {
    padding: 10,
    backgroundColor: '#E70D6F',
    borderRadius: 5,
  },
  recordCount: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  textArea: {
    backgroundColor: '#522D6D', // Lighter purple background
    color: '#FFFFFF',
    height: 200,
    fontSize: 16,
    padding: 10,
    marginBottom: 10, // Reduced margin to fit character count
  },
  button: {
    backgroundColor: '#E70D6F',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20, // Distance from the bottom
    left: 20, // Distance from the left
    right: 20, // Distance from the right to ensure it stretches across
  },
  buttonText: {
    color: '#FFFFFF',
  },
  charCount: {
    color: '#FFFFFF', // Ensuring the character count is visible on the dark background
    fontSize: 14,
    marginBottom: 10, // Adding some space before the save button
  },
  emptyText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  //Options
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#522D6D', // Lighter purple for the separator
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#FFFFFF',
    paddingLeft: 15, // Space between icon and text
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});

export default styles;
