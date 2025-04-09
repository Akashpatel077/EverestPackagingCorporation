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
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
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
  changeButton: {
    color: '#0088cc',
    fontSize: 14,
    fontWeight: '600',
  },
  shippingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
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
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  shippingDate: {
    fontSize: 14,
    color: '#666666',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  orderSize: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0088cc',
  },
  paymentButton: {
    backgroundColor: '#0088cc',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
