import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 24,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
  emailText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 32,
    fontFamily: 'Poppins-Regular',
  },
  preferencesContainer: {
    marginBottom: 32,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  labelContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  checkboxDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
  saveButton: {
    backgroundColor: '#0088CC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
