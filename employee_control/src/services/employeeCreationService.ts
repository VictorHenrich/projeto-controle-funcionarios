import IService from "@/interfaces/service";
import api from "./api";
import Employee from "@/interfaces/employee";



export type EmployeeCreationServiceProps = Omit<Employee, "id">;


export default class EmployeeCreationService implements IService<void>{
    static url: string = "/employees"

    constructor(
        private employeeData: EmployeeCreationServiceProps
    ){

    }

    async execute(): Promise<void> {
        await api.post(EmployeeCreationService.url, this.employeeData);
    }
    
}