import React, { useEffect, useState } from 'react';

import firebase from '../firebase';
const Profile = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const idToken = await firebase.auth().currentUser.getIdToken();
        const response = await fetch('http://localhost:5000/files', {
          headers: {
            Authorization: idToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFiles(data);
        } else {
          setError('Error fetching files');
        }
      } catch (error) {
        setError('Error fetching files');
      }
    };

    fetchFiles();
  }, []);

  const handleRemoveFile = async (fileId) => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken();
      const response = await fetch(`http://localhost:5000/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          Authorization: idToken,
        },
      });

      if (response.ok) {
        setFiles((prevFiles) => prevFiles.filter((file) => file.fileId !== fileId));
      } else {
        setError('Error removing file');
      }
    } catch (error) {
      setError('Error removing file');
    }
  };

  return (
    <div>
      <h1>Uploaded Files</h1>
      {error && <p>{error}</p>}
      <ul>
        {files.map((file) => (
          <li key={file.fileId}>
            {file.filename}{' '}
            <button onClick={() => handleRemoveFile(file.fileId)}>Remove</button>
          </li>
         
        ))}
      </ul>
    </div>
  );
};

export default Profile;
