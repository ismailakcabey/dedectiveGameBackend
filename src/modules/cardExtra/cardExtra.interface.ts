import { FilterQuery } from "src/shared/dtos/query.dto";
import { CardExtraDto } from "./cardExtra.dto";
import { CardExtraTable } from "./cardExtra.entity";

export interface ICardExtraInterface{
    createCardExtra(cardExtra:CardExtraDto,authenticatedUserId:string):Promise<CardExtraTable>
    findCardExtra(query:FilterQuery):Promise<{
        data:CardExtraTable[],
        count:number
    }>;
    fincCardExtraById(id:number):Promise<CardExtraTable>;
    deleteCardExtra(id:number):Promise<boolean>;
    updateCardExtra(id:number, cardExtra:CardExtraDto,authenticatedUserId:string):Promise<CardExtraTable>
}