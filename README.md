# Serverless Image Upload and View (SIUV) - Backend Service

This is the backend service for the Serverless Image Upload and View (SIUV) application. It handles the generation of pre-signed URLs for uploading images to AWS S3, using a simple Express.js application in TypeScript.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [How It Works](#how-it-works)
- [License](#license)

## Technologies Used

- **Node.js** with **Express.js** for the server
- **TypeScript** for type safety
- **AWS SDK** for interacting with AWS services
  - **AWS S3** for file storage
- **dotenv** for managing environment variables
- **CORS** middleware to handle cross-origin requests

## Setup and Installation

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/deepikasandp/SIUV-Service.git
   cd SIUV-Service
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```
3. **Create a .env file in the root directory to store environment variables:**
   ```bash
   AWS_ACCESS_KEY_ID=<your-aws-access-key>
   AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
   AWS_REGION=<your-aws-region>
   AWS_S3_BUCKET_NAME=<your-s3-bucket-name>
   PORT=5000
   ```
4. **Run the development server:**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Project Structure

The project structure follows a typical React application format. Here’s an outline:

```
/src
  index.ts    # Main server code handling requests
  .env        # Environment variables (should not be committed to version control)
```

## Main Files

index.ts: The core Express.js server that handles requests and generates pre-signed URLs for AWS S3 uploads.
.env: Stores sensitive AWS and configuration keys.

## Environment Variables

The service relies on a few environment variables to interact with AWS and configure the server:

```bash
AWS_ACCESS_KEY_ID: Your AWS Access Key ID
AWS_SECRET_ACCESS_KEY: Your AWS Secret Access Key
AWS_REGION: The AWS region where your S3 bucket is hosted
AWS_S3_BUCKET_NAME: The name of your S3 bucket
PORT: The port the server listens to (default: 5000)
```

## Endpoints

1. Generate Pre-signed URL

```bash
GET /presign-url/:token/
```

This endpoint generates a pre-signed URL for uploading an image directly to AWS S3.

Params:
token: Unique identifier (e.g., patient token number)
Query Params:
type: The content type of the file being uploaded (e.g., image/jpeg, image/png)
Example Request:

```bash
GET /presign-url/12345/?type=image/jpeg
```

Response:

```bash
{
  "url": "https://your-bucket.s3.amazonaws.com/..."
}
```

2. Health Check
   GET /

A simple health check endpoint to verify that the server is running.

```bash
Express + Typescript Server
```

## How It Works

1. Pre-signed URLs: The service generates a pre-signed URL for secure, direct image uploads to S3 from the frontend. This URL includes an expiration time and the appropriate permissions to allow file upload without exposing sensitive AWS credentials to the frontend.

2. AWS S3 Integration: The uploaded image is stored in a specified S3 bucket under a unique key that includes the token number and a timestamp.

3. Token-based Filenaming: The token is used to ensure that each image upload is associated with a specific identifier (e.g., patient token).

## License

This project is licensed under the MIT License. See the LICENSE file for details.
