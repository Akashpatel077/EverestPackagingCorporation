import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressDetails: {
    marginLeft: 12,
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666666',
  },
  addressRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteButton: {
    padding: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0088cc',
  },
  radioButtonSelected: {
    backgroundColor: '#0088cc',
  },
  addButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#0088cc',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
  },
  addButtonText: {
    color: '#0088cc',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#0088cc',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;