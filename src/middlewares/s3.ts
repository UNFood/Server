import { S3Client } from '@aws-sdk/client-s3';
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config/config";

const s3Config = new S3Client({
    region: config.aws.bucket_region,
    credentials: {
        accessKeyId: config.aws.public_key,
        secretAccessKey: config.aws.secret_key,    
    }
    })


export const upload = multer({
    storage: multerS3({
        s3: s3Config,
        bucket: "unfood",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})