import React, {useState, useCallback} from 'react';
import {View, TouchableOpacity, Text, StatusBar} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  BubbleProps,
  IMessage,
  SendProps,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';
import {Header, Icon} from 'src/Components';
import {BackIcon, SendMessage} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {KeyboardProvider} from 'react-native-keyboard-controller';

const BulkOrder = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: 'Thank you for your message. How can I assist you with your bulk order today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bulk Order Bot',
          avatar: require('../../../../assets/images/logo.png'),
        },
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [botMessage]),
      );
    }, 1000);
  }, []);

  const renderBubble = (
    props: React.JSX.IntrinsicAttributes & BubbleProps<IMessage>,
  ) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#E1FFC7',
            borderRadius: 15,
            padding: 5,
            marginVertical: 3,
          },
          left: {
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            padding: 5,
            marginVertical: 3,
          },
        }}
        textStyle={{
          right: {
            color: '#000000',
            fontSize: 16,
          },
          left: {
            color: '#000000',
            fontSize: 16,
          },
        }}
      />
    );
  };

  const renderSend = (
    props: React.JSX.IntrinsicAttributes & SendProps<IMessage>,
  ) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Icon name={SendMessage} width={24} height={24} color="#FFFFFF" />
        </View>
      </Send>
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.inputContainer}
      />
    );
  };

  return (
    <CSafeAreaView>
      <KeyboardProvider
        navigationBarTranslucent={true}
        statusBarTranslucent={true}>
        <View style={styles.container}>
          <Header title="Bulk Order Bot" icon1={BackIcon} />
          <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={{
              _id: 1,
            }}
            renderBubble={renderBubble}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
            placeholder="Message"
            alwaysShowSend
            bottomOffset={80}
            timeTextStyle={{
              right: {color: '#8B8B8B'},
              left: {color: '#8B8B8B'},
            }}
            maxComposerHeight={100}
            // messageContainerStyle={styles.messageContainer}
            // textInputStyle={styles.messageText}
          />
        </View>
      </KeyboardProvider>
    </CSafeAreaView>
  );
};

export default BulkOrder;
