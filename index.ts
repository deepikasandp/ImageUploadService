import express, { Request, Response } from 'express'; // Ensure you're importing Request and Response
import AWS from 'aws-sdk';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Endpoint to generate a pre-signed URL for uploading
app.get('/presign-url/:token/', (req: Request, res: Response) => {
  const tokenNumber = req.params.token;
  const contentType = req.query.type as string;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${tokenNumber}/${Date.now()}-uploaded-image.${contentType.split('/')[1]}`, // Set unique filename
    Expires: 500, // URL expiry time in seconds
    ContentType: 'image/jpeg', // Use decoded content type
  };

  console.log(params)
  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error('Error generating presigned URL:', err);
      return res.status(500).send('Error generating presigned URL');
    }
    // Always return a response
    return res.json({ url });
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send("Express + Typescript Server")
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
