import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  cardPreview: {
    backgroundColor: '#8B6B4D',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 24,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 12,
    marginBottom: 4,
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfWidth: {
    width: '48%',
  },
  saveCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#8B6B4D',
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#8B6B4D',
  },
  saveCardText: {
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#8B6B4D',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
