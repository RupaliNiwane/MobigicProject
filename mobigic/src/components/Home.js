import React, { useEffect, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const Home = () => {
  const router = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [file, setFile] = useState(null);

  const MINIMUM_PHONE_NUMBER_LENGTH = 10;
  const auth = getAuth();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'normal',
      callback: (response) => {},
      'expired-callback': () => {},
    });
  }, [auth]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSentOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;

      if (formattedPhoneNumber.length < MINIMUM_PHONE_NUMBER_LENGTH) {
        console.error('Phone number is too short.');
        return;
      }

      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber('');
      alert('OTP has been sent');
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp('');
      router('/profile');
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileUpload = async () => {
    console.log('Uploading file...');
    
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });
  
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded:', data.filename);
      } else {
        console.error('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
       <Card  className='mt-5 mx-5' style={{ width: '30rem' }}>
      <Card.Body>
       <h1>File Upload</h1>
      {!otpSent ? <div id="recaptcha-container"></div> : null}

      <input type="file" onChange={handleFileChange} accept=".txt, .pdf, .doc, .docx" /> <br />

      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter phone number with country code"
        className="border border-gray-500 p-2 mt-3 rounded-md"
      /> <br />

      <input
        type="text"
        value={otp}
        onChange={handleOtpChange}
        placeholder="Enter OTP"
        className="border border-gray-500 p-2 mt-3 rounded-md"
      />{' '}
      &nbsp;

      <button
        onClick={otpSent ? handleOtpSubmit : handleSentOtp}
        className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white p-2 rounded-md`}
        style={{ backgroundColor: otpSent ? 'green' : 'blue' }}
      >
        {otpSent ? 'Submit OTP' : 'Send OTP'}
      </button>

      <br />
      <button onClick={handleFileUpload} className="bg-blue-500 text-black p-2  mt-3 rounded-md">
        Upload File
      </button>
      </Card.Body>
    </Card>
    </div> 
  );
};

export default Home;
