import { S3Client } from '@aws-sdk/client-s3';
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "./config";

export const s3Config = new S3Client({
    region: config.aws.bucket_region,
    credentials: {
        accessKeyId: config.aws.public_key,
        secretAccessKey: config.aws.secret_key,    
    }
    });