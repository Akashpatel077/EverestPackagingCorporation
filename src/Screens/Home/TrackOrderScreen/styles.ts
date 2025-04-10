import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 40,
  },
  productSection: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productInfo: {
    fontSize: 14,
    color: '#9B9B9B',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  orderDetailsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderDetailLabel: {
    fontSize: 14,
    color: '#9B9B9B',
  },
  orderDetailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusSection: {
    flex: 1,
    padding: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statusIconContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedStatusIcon: {
    backgroundColor: '#4CAF50',
  },
  statusLine: {
    width: 2,
    height: 40,
    backgroundColor: '#F5F5F5',
    marginVertical: 4,
  },
  completedStatusLine: {
    backgroundColor: '#4CAF50',
  },
  statusContent: {
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9B9B9B',
    marginBottom: 4,
  },
  completedStatusText: {
    color: '#000000',
  },
  statusTime: {
    fontSize: 12,
    color: '#9B9B9B',
  },
});
