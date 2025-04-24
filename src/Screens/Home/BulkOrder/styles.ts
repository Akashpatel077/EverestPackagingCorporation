import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25D366',
    marginLeft: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  quickReplyButton: {
    backgroundColor: '#E1FFC7',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DCF8C6',
    elevation: 1,
  },
  quickReplyText: {
    color: '#075E54',
    fontSize: 15,
    fontWeight: '500',
  },
  inputToolbar: {
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 6,
    minHeight: 36,
  },
  messageContainer: {
    marginVertical: 4,
    marginHorizontal: 12,
    maxWidth: '80%',
    borderRadius: 12,
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
  },
});
