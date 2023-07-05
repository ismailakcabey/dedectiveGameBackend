export class QueryDto {
    query: {
        where?: object
        take: number
        skip: number
        relations: Array<string>
        select: Array<string>
        loadRelationIds: boolean
    }
}

export class FilterQuery{
    query:string
}