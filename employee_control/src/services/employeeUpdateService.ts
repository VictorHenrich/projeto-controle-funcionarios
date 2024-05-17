import IService from "@/interfaces/service";
import api from "./api";
import Employee from "@/interfaces/employee";



export type ExmployeeUpdateServiceProps = Employee;


export default class ExmployeeUpdateService implements IService<void>{
    static url: string = "/employees"

    constructor(
        private employeeData: ExmployeeUpdateServiceProps
    ){

    }

    async execute(): Promise<void> {
        const data: Omit<Employee, "id"> = {...this.employeeData};

        const url: string = `${ExmployeeUpdateService.url}/${this.employeeData.id}`

        await api.put(url, data);
    }
    
}