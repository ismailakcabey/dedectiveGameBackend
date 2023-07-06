import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { verifyMail } from '../utils/verifyMail';
const amqp = require("amqplib")
@Injectable()
export class RabbitMQService implements OnModuleInit {

    constructor(
        private readonly configService: ConfigService,
        private readonly emailService: EmailService
    ) { }

    async onModuleInit() {
        try {
            this.emailReadConsume()
        } catch (error) {
            Logger.error("error: " + error)
        }
    }



    emailReadConsume = async () => {
        const connection = await amqp.connect(this.configService.get('RABBIT_MQ_CONNECTION_URL'))
        const channel = await connection.createChannel()
        const assertion = await channel.assertQueue("email")
        channel.consume("email", message => {
            channel.ack(message)
            const user = JSON.parse(message.content.toString())
            if (user) {
                const verifyEmail = verifyMail(user.createdAt)
                const sendEmail = this.emailService.emailSend(verifyEmail, user.email, user.userName, "Doğrulama Maili", "Hesabınızı lütfen doğrulayın")
            }
        })
    }

    sendQueueMessage = async (message: string, data: any) => {
        try {
            const connection = await amqp.connect(process.env.RABBIT_MQ_CONNECTION_URL)
            const channel = await connection.createChannel()
            const assertion = await channel.assertQueue(message)
            channel.sendToQueue(message, Buffer.from(JSON.stringify(data)))
        } catch (error) {
            Logger.error(error)
        }
    }

}
