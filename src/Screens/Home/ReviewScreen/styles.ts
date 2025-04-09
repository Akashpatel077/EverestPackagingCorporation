import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 16,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 32,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productInfo: {
    marginLeft: 16,
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  productDetails: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  reorderButton: {
    backgroundColor: '#0088cc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  reorderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 32,
    color: '#000000',
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  ratingLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  starContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  reviewInput: {
    height: 150,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#000000',
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  addPhotoText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#0088cc',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 'auto',
    paddingVertical: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#0088cc',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
