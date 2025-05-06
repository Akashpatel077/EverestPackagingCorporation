import {StyleSheet} from 'react-native';
import {colors} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  paymentOption: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
    paddingTop: 5,
    fontFamily: 'Poppins-Medium',
  },
  linkText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  razorPayTitle: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    paddingTop: 5,
  },
  razorPaySubTitle: {
    color: '#555555',
    fontFamily: 'Poppins-Medium',
  },
  razorPayIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  razorPayTextContainer: {},
  paymentButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16,
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
