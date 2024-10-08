
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const handleSuccess = (response) => {
    console.log('Google login successful:', response);
  };

  const handleFailure = (response) => {
    console.log('Google login failed:', response);
  };

  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID" 
      buttonText="Login with Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
