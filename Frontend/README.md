# Node.js and Angular Image Uploader
This project consists of a Node.js API for uploading images to Amazon S3 and an Angular app for uploading and viewing images. The Node.js API uses the Multer middleware to handle multi-part form data and the AWS SDK to upload images to S3. The Angular app uses the ngx-dropzone package for uploading images and the ngx-infinite-scroll package for infinite scroll pagination.

## Prerequisites
Before running this project, you must have the following installed:
- Node.js (v18.5.0 or later)
- npm (v9.5.0 or later)
- Angular CLI (v15.0.0 or later)
- AWS account with S3 bucket
## Getting Started
1. Clone the repository to your local machine:
```
git clone https://github.com/rowansalem/node-angular-image-uploader.git
```
2. Navigate to the server directory and install the Node.js dependencies:

```
cd node-angular-image-uploader/Backend
npm install
```
3. Create a .env file in the server directory with the following environment variables:

```
AWS_ACCESS_KEY_ID=<your-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
AWS_REGION=<your-region>
S3_BUCKET=<your-bucket-name>
```
4. Start the Node.js API:
```
node sever.js
```
5. Open a new terminal window and navigate to the client directory:
```
cd ../Backend
```
6. Install the Angular dependencies:
```
npm install
```
7. Start the Angular app:
```
ng serve
```
8. Open a web browser and navigate to http://localhost:4200.

## Uploading Images
To upload an image, click the Choose File button and select an image file. Enter a file name and description, then click the Upload button.

## Viewing Images
Uploaded images are displayed on the home page of the Angular app. Scroll down to load more images.


 
