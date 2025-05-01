import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#F5F6FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfField: {
    width: '48%',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    gap: 12,
    fontFamily: 'Poppins-Regular',
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedType: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  typeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTypeText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  makeThisAsShippingAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  shippingCheckBoxText: {
    fontSize: 14,
    paddingLeft: 5,
    color: '#555555',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default styles;
