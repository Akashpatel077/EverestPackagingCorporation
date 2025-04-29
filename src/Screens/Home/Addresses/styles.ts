import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerIcon: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  addressSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    marginBottom: 12,
  },
  addressContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
  defaultText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
  },
});
