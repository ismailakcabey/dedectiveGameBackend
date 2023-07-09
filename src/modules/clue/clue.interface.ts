import { FilterQuery } from "src/shared/dtos/query.dto";
import { ClueDto } from "./clue.dto";
import { ClueTable } from "./clue.entity";

export interface IClueService {
    createClue(clue:ClueDto):Promise<ClueTable>;
    findClue(query:FilterQuery):Promise<{
        data:ClueTable[],
        count:number
    }>;
    findClueById(id:number):Promise<ClueTable>;
    deleteClue(id:number):Promise<boolean>;
    updateClue(id:number,clue:ClueDto):Promise<ClueTable>;
}