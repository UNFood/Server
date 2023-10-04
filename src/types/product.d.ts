import Document from "mongoose";

export interface ProductI {
  name: String;
  description: String;
  price: Number;
  image: String;
  category: Number;
  stock: Number | undefined;
  total_sales: Number;
}

export interface ImageI {
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  size: Number,
  bucket: String,
  key: String,
  acl: String,
  contentType: String,
  contentDisposition: null,
  contentEncoding: null,
  storageClass: String,
  serverSideEncryption: null,
  metadata: undefined,
  location: String,
  etag: String,
  versionId: undefined
}