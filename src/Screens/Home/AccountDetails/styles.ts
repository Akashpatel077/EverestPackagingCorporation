import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  requiredStar: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  passwordSection: {
    marginTop: 24,
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 10,
  },
  passwordTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  passwordInputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  toggleButton: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
