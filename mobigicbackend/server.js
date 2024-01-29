const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./mobigicfirebaseadminsdk.json');
const cors = require ('cors')
const app = express();
const port = 5000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
 
app.use(cors());
const db = admin.firestore();

app.use(express.json());

app.get('/files', async (req, res) => {
  try {
    // Check if the user is authenticated
    const idToken = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Retrieve files for the authenticated user
    const filesSnapshot = await db.collection('files').where('userId', '==', userId).get();
    const files = filesSnapshot.docs.map((doc) => doc.data());

    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/upload', async (req, res) => {
  try {
    // Check if the user is authenticated
    const idToken = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Save file information to Firestore
    const fileData = {
      userId,
      filename: req.body.filename,
  
    };

    const docRef = await db.collection('files').add(fileData);

    res.json({ fileId: docRef.id });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/files/:fileId', async (req, res) => {
    try {
     
      const idToken = req.headers.authorization;
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const userId = decodedToken.uid;
  
      const fileId = req.params.fileId;
  
      // Check if the file belongs to the user
      const fileDoc = await db.collection('files').doc(fileId).get();
      const fileData = fileDoc.data();
  
      if (!fileData || fileData.userId !== userId) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
      }
  
      // Delete the file from Firestore
      await db.collection('files').doc(fileId).delete();
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error removing file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
