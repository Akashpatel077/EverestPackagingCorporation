import {createNavigationContainerRef} from '@react-navigation/native';
import {Alert, Share} from 'react-native';

export enum OPTIONS {
  GENDER = 'describe gender',
  BODY_TYPE = 'your body type',
  LANGUAGE = 'Speak Language',
  EXERCISE = 'Exercise',
  SHOW_ME_PROFILE = 'Show me profile',
  LOOKING_FOR = 'What are you looking for?',
  SEXUAL_ORIENTATION = 'my sexual orientation is',
  SMOKING = 'your opinion on smoking',
  DRINKING = 'your opinion on drinking?',
  MERITAL = 'your merital status',
  FAITH = 'your faith',
  PET = 'Pet questions',
  QUALIFICATION = 'Qualification',
}

export const getOptions = (categories: any[], categoryName: String) => {
  const cat =
    categories?.length > 0 &&
    categories.filter(item => item.name === categoryName)[0].options;
  return cat ? cat : [];
};

export const navigationRef = createNavigationContainerRef();

export const onShare = async (user_name: any, id: any) => {
  try {
    const result = await Share.share({
      message: `https://datingApp/${user_name}/${id}`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert('Message Error');
  }
};
