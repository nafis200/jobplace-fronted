import React, { useState, useContext } from 'react';
import { AuthContext } from './path_to_Authprovider';
import { RecaptchaVerifier } from 'firebase/auth';
import auth from '../firebase';

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const { signInWithPhone } = useContext(AuthContext);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  };

  const handleSignIn = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhone(phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
    } catch (error) {
      console.error('Error during sign in with phone:', error);
    }
  };

  const handleVerifyCode = async () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    try {
      await auth.signInWithCredential(credential);
    } catch (error) {
      console.error('Error during code verification:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>

      <input
        type="text"
        placeholder="Verification code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerifyCode}>Verify Code</button>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneLogin;
