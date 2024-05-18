'use client'

import { BodyItemProps } from "@/components/table";
import moment from "moment";
import Employee from "@/interfaces/employee";
import ExmployeeListingService from "@/services/employeeListingService";
import React from "react";


export interface EmployeeContextProps{
    employeeSelected: Employee | null,
    butttonConfirmName: string,
    openModalExclusion: boolean,
    openModalEdit: boolean,
    employees: BodyItemProps[],
    setOpenModalEdit: (open: boolean) => void,
    setOpenModalExclusion: (open: boolean) => void,
    setEmployeeSelected: (employee: Employee | null) => void,
    setButttonConfirmName: (buttonConfirmName: string) => void,
    setEmployees: (employees: BodyItemProps[]) => void,
    loadAllEmployees: ()=> Promise<void>
}

const initialValue: EmployeeContextProps = {
    employeeSelected: null,
    butttonConfirmName: "Cadastrar",
    employees: [],
    openModalExclusion: false,
    openModalEdit: false,
    setOpenModalEdit: (open) => null,
    setOpenModalExclusion: (open) => null,
    setButttonConfirmName: (buttonName) => null,
    setEmployeeSelected: (employee) => null,
    setEmployees: (employees) => null,
    loadAllEmployees: async () => undefined
}

export const EmployeeContext = React.createContext(initialValue);


export default function EmployeerProvider({ children }: React.PropsWithChildren): React.ReactElement{
    const [employeeSelected, setEmployeeSelected] = React.useState<Employee | null>(null);

    const [butttonConfirmName, setButttonConfirmName] = React.useState<string>(initialValue.butttonConfirmName);

    const [employees, setEmployees] = React.useState<BodyItemProps[]>([]);

    const [openModalExclusion, setOpenModalExclusion] = React.useState<boolean>(false);

    const [openModalEdit, setOpenModalEdit] = React.useState<boolean>(false);

    async function loadAllEmployees(): Promise<void>{
        const employeeListingService = new ExmployeeListingService();

        const employees: Employee[] = await employeeListingService.execute();

        setEmployees(employees.map(employee => {
            return {
                data: employee,
                rows: [
                    {
                        headerPropName: "name",
                        item: employee.name
                    },
                    {
                        headerPropName: "office",
                        item: employee.office
                    },
                    {
                        headerPropName: "wage",
                        item: employee.wage
                    },
                    {
                        headerPropName: "entryDate",
                        item: employee.entryDate && moment(employee.entryDate).format("DD/MM/YYYY")
                    },
                    {
                        headerPropName: "departureDate",
                        item: employee.departureDate && moment(employee.departureDate).format("DD/MM/YYYY")
                    }
                ]
            }
        }));
    }

    return (
        <EmployeeContext.Provider 
            value={{
                employeeSelected, 
                butttonConfirmName,
                employees,
                openModalExclusion,
                openModalEdit,
                setOpenModalEdit,
                setOpenModalExclusion,
                setEmployeeSelected,
                setButttonConfirmName,
                setEmployees,
                loadAllEmployees
            }}
        >
            {children}
        </EmployeeContext.Provider>
    )
}