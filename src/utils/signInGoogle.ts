import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const signInGoogle = async (webClientId:string) => {
  try {
    console.log(`RNA - 0 - GoogleSignin.configure with params ${JSON.stringify({webClientId: webClientId})}`);
    GoogleSignin.configure({webClientId: webClientId});
    
    const res = await GoogleSignin.hasPlayServices();
    console.log(`RNA - 1 - GoogleSignin.hasPlayServices : ${JSON.stringify(res)}`);

    const result = await GoogleSignin.signIn();
    console.log(`RNA - 2 - GoogleSignin.signIn : ${JSON.stringify(result)}`);

    if(webClientId) {
      await AsyncStorage.setItem('webClientId', webClientId); // Used for convenience of the logout
    }
    return auth.GoogleAuthProvider.credential(result.idToken);
  } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
      } else {
        console.log('RNA - X - GoogleSignin.hasPlayServices: ', error.message, error.code);
      }
  }
};
