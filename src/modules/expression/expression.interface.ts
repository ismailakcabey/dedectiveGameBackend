import { FilterQuery } from "src/shared/dtos/query.dto";
import { ExpressionDto } from "./expression.dto";
import { ExpressionTable } from "./expression.entity";

export interface IExpressionService{
    createExpression(expression:ExpressionDto):Promise<ExpressionTable>;
    findExpression(query:FilterQuery):Promise<{
        data:ExpressionTable[],
        count:number
    }>;
    findExpressionById(id:number):Promise<ExpressionTable>;
    deleteExpression(id:number):Promise<boolean>
    updateExpression(id:number,expression:ExpressionDto):Promise<ExpressionTable>;
}