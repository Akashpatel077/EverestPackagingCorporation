import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  shippingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  shippingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  shippingDetails: {
    marginLeft: 12,
    flex: 1,
  },
  shippingType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  shippingInfo: {
    fontSize: 14,
    color: '#666666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666666',
    marginLeft: 12,
  },
  radioButtonSelected: {
    borderColor: '#0088cc',
    backgroundColor: '#0088cc',
  },
  applyButton: {
    backgroundColor: '#0088cc',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
