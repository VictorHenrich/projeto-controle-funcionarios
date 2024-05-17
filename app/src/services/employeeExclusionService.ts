import IService from "@/interfaces/service";
import api from "./api";
import Employee from "@/interfaces/employee";



export type ExmployeeExclusionServiceProps = Pick<Employee, "id">;


export default class ExmployeeExclusionService implements IService<void>{
    static url: string = "/employees"

    constructor(
        private employeeData: ExmployeeExclusionServiceProps
    ){

    }

    async execute(): Promise<void> {
        const url: string = `${ExmployeeExclusionService.url}/${this.employeeData.id}`

        await api.delete(url);
    }
    
}