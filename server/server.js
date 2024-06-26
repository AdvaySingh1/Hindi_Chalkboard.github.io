const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const port = 3000; // port

// Use body-parser middleware to handle parsing JSON
app.use(bodyParser.json({ limit: '10mb' }));

// Enable CORS
app.use(cors());

app.post('/upload-snapshot', (req, res) => {
    const imageData = req.body.image.replace(/^data:image\/png;base64,/, '');
    const filePath = '/Users/advaysingh/Documents/projects/hindi_classification/server/snapshot.png';

    fs.writeFile(filePath, imageData, 'base64', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error saving the snapshot'});
        }
        res.status(200).json({ message: 'Snapshot saved successfully' });
    });
});

app.get('/outputs', (req, res) => {
    res.sendFile('/Users/advaysingh/Documents/projects/hindi_classification/server/outputs.json');
  });

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));