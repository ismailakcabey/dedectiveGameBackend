import { CACHE_MANAGER, Inject, Injectable, Logger, } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {

    constructor(
    ){}

    async s3FileUpload(file,fileName,fileType){
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          });
        const s3 = new AWS.S3()
        
       try {
        await s3.putObject({
            Body:file,
            Bucket:process.env.AWS_BUCKET,
            Key:`${fileName}${new Date}.${fileType}`
        }).promise()
        const date = new Date
        const date2 = date.toISOString();
        const replaceDate = date2.replace(" ","+")
        const preUrl = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${fileName}${replaceDate}.${fileType}`
        const fileUrl = preUrl.replace(" ", "+");
       } catch (error) {
        Logger.error(error)
       }
    }

}