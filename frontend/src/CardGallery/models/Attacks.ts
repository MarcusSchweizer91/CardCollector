export interface CostCounter {
    [key: string]: number;
}


export type Attacks ={

    name:string,
    cost: string[],
    costCounts: CostCounter,
    damage:string
}
