export enum RoverType {
    CURIOSITY = "curiosity",
    OPPORTUNITY = "opportunity",
    SPIRIT = "spirit"
}

export const cameras: Map<string, Array<string>> = new Map(
    [
        ["curiosity", ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"]],
        ["opportunity", ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"]],
        ["spirit", ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"]],
    ]
)

export const datesFilter: Map<string, Array<string>> = new Map(
    [
        ["curiosity", ["earth_date", "sol"]],
        ["opportunity", ["earth_date", "sol"]],
        ["spirit", ["earth_date", "sol"]]
    ]
)

export type Query = {
    rover: string;
    camera: string;
    dateFilter: string;
    date: string;
}

export type BookMark ={
    rover: string;
    camera: string;
    dateFilter: string;
    date: string;
    name: string;
    id: number;
}

export type QueryString={
    initialString: string;
    pageNumber: number;
}