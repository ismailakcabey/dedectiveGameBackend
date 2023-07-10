import { FilterQuery } from "src/shared/dtos/query.dto";
import { MessageDto } from "./message.dto";
import { MessageTable } from "./message.entity";
import { bool } from "aws-sdk/clients/signer";

export interface IMessageService{
    createMessage(message:MessageDto,authenticatedUserId:string):Promise<MessageTable>;
    findMessage(query:FilterQuery):Promise<{
        data:MessageTable[],
        count:number
    }>;
    findMessageById(id:number):Promise<MessageTable>;
    deleteMessage(id:number):Promise<bool>;
    updateMessage(id:number, message:MessageDto,authenticatedUserId:string):Promise<MessageTable>
}