import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
  webClientId:
    '39503287360-g34v045m55k4djt60asthpfvoimqib05.apps.googleusercontent.com',
  offlineAccess: true,
});

const loginWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: false});
const userInfo = await GoogleSignin.signIn();

console.log("userInfo",userInfo);

const idToken = userInfo.idToken;
  console.log("idToken",idToken);
  
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  console.log("googleCredential",googleCredential);
  
  return auth().signInWithCredential(googleCredential);
};

const loginWithApple = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });
  console.log('appleAuthRequestResponse', appleAuthRequestResponse);
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }
  const {identityToken, nonce} = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );
  console.log('appleCredential', appleCredential);
  return auth().signInWithCredential(appleCredential);
};

export {
  loginWithGoogle,
  loginWithApple,
};
