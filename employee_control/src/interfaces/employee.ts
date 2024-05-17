


export default interface Employee{
    id: string,
    name: string,
    wage: number,
    office: string,
    entryDate: Date | string,
    birthday?: Date | string,
    departureDate?: Date
}