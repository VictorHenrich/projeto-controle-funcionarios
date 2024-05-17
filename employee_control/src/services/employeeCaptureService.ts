import IService from "@/interfaces/service";
import api from "./api";
import Employee from "@/interfaces/employee";



export type ExmployeeCaptureServiceProps = Pick<Employee, "id">;


export default class ExmployeeCaptureService implements IService<Employee | null>{
    static url: string = "/employees"

    constructor(
        private employeeData: ExmployeeCaptureServiceProps
    ){

    }

    async execute(): Promise<Employee | null> {
        const url: string = `${ExmployeeCaptureService.url}/${this.employeeData.id}`

        const { data } =  await api.get(url);

        return data.data;
    }
    
}