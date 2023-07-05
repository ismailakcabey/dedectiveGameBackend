import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
const Mailjet = require('node-mailjet');

@Injectable()
export class EmailService {

    constructor(

    ){}

    async emailSend(html:any,toEmail:string,toName:string,subject:string,message:string){
        const mailjet = new Mailjet({
            apiKey: process.env.MAIL_JET_API_KEY,
            apiSecret: process.env.MAIL_JET_API_SECRET_KEY
          });
          const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
              Messages: [
                {
                  From: {
                    Email: process.env.MAIL_JET_SEND_EMAIL,
                    Name: "Dedective Game"
                  },
                  To: [
                    {
                      Email: toEmail,
                      Name: toName
                    }
                  ],
                  Subject: subject,
                  TextPart: message,
                  HTMLPart: html
                }
              ]
            })
    request
        .then((result) => {
        })
        .catch((err) => {
            Logger.error(err)
    
        })
    }

}