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
    fontFamily: 'SchibstedGrotesk-Medium',
  },
  requiredStar: {
    color: 'red',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: 'SchibstedGrotesk-Regular',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'SchibstedGrotesk-Regular',
  },
  passwordSection: {
    marginTop: 24,
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
  },
  passwordTitle: {
    fontSize: 16,
    fontFamily: 'SchibstedGrotesk-Bold',
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
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'SchibstedGrotesk-Medium',
  },
});
