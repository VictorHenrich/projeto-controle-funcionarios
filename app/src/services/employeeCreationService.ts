import IService from "@/interfaces/service";
import api from "./api";
import Employee from "@/interfaces/employee";



export type ExmployeeCreationServiceProps = Omit<Employee, "id">;


export default class ExmployeeCreationService implements IService<void>{
    static url: string = "/employees"

    constructor(
        private employeeData: ExmployeeCreationServiceProps
    ){

    }

    async execute(): Promise<void> {
        await api.post(ExmployeeCreationService.url, this.employeeData);
    }
    
}