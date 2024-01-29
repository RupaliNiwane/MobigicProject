import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import {  ref, set } from "firebase/database";
import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    phonenumber: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, username, password,phonenumber } = user;
  
    // Check if the password meets the minimum length requirement
    if (password.length < 6) {
      window.alert('Password should be at least 6 characters');
      return;
    }
  
    try {
      // Now you can use these values for your authentication logic
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      console.log('User created:', newUser);
      window.alert('Successfully created user');
  
      // Assuming you have the user's UID available in user.uid
      set(ref(db, 'users/' + newUser.uid), {
        username: username,
        phonenumber:phonenumber,
        email: email,
        id: newUser.uid,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error creating user:', errorCode, errorMessage);
      window.alert('Error creating user: ' + errorMessage);
    }
  };

  return (
    <div>
      <div className='login'>
        <Card style={{ width: '20rem' }}>
          <Card.Body className=''>
            <Card.Title> Register FROM</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group className='mb-3' controlId='formBasicUserName'>
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter UserName'
                    name='username'
                    value={user.username}
                    onChange={handleChange}
                  />
                 </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicUserPhonenumber'>
                  <Form.Label>phonenumber</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter userphonenumber'
                    name='phonenumber'
                    value={user.phonenumber}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant='primary' type='submit' onClick={handleSubmit}>
                  Submit
                </Button>
                <div className='my-3'>
                  <Link to='/login' className='my-3'>
                    goto? Login page
                  </Link>
                </div>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Register;
