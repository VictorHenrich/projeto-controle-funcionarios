'use client'

import React from "react";
import moment from "moment";
import { Stack } from "@chakra-ui/react";
import ModalDefault from "@/components/modal";
import InputDefault from "@/components/input";
import { EmployeeContext } from "./context";
import Employee from "@/interfaces/employee";
import EmployeeCreationService from "@/services/employeeCreationService";
import ExmployeeUpdateService from "@/services/employeeUpdateService";



export default function EmployeeModalEdit(props: any): React.ReactElement{
    const newEmployee: Employee = {
        id: "",
        name: "",
        office: "",
        wage: 0,
    }

    const {
        butttonConfirmName,
        openModalEdit,
        employeeSelected,
        setEmployeeSelected,
        setButttonConfirmName,
        setOpenModalEdit,
        loadAllEmployees
    } = React.useContext(EmployeeContext);

    const [employeeData, setEmployeeData] = React.useState<Employee>(newEmployee)

    function handleEmployeeData(employee: Partial<Employee>): void{
        setEmployeeData({...employeeData, ...employee});
    }

    async function onConfirmEditEmployee(): Promise<void>{
        if(!employeeSelected)
            await createEmployee();

        else
            await updateEmployee();

        await loadAllEmployees();

        setOpenModalEdit(false);

        setButttonConfirmName("Cadastrar");

        setEmployeeSelected(null);
    }

    async function createEmployee(){
        const employeeCreationService = new EmployeeCreationService(employeeData);

        await employeeCreationService.execute();
    }

    async function updateEmployee(){
        const employeeUpdateService = new ExmployeeUpdateService(employeeData);

        await employeeUpdateService.execute();
    }

    function onCloseEditEmployee(): void{
        setOpenModalEdit(false);

        setButttonConfirmName("Cadastrar");
    }


    React.useEffect(()=> {
        setEmployeeData(employeeSelected || newEmployee);
    }, [openModalEdit]);

    return (
        <ModalDefault
            FooterProps={{
                onConfirm: onConfirmEditEmployee,
                onClose: onCloseEditEmployee,
                buttonMode: "edit",
                enable: true,
                buttonCloseName: "Cancelar",
                butttonConfirmName: butttonConfirmName
            }}
            isOpen={openModalEdit}
        >
            <Stack
                spacing={5}
                direction="column"
                width="100%"
                minHeight={400}
            >
                <InputDefault 
                    placeholder="Nome"
                    type="text"
                    value={employeeData.name}
                    onChange={({ target }) => {
                        handleEmployeeData({name: target.value})
                    }}
                />
                <InputDefault 
                    placeholder="Cargo"
                    type="text"
                    value={employeeData.office}
                    onChange={({ target }) => {
                        handleEmployeeData({office: target.value})
                    }}
                />
                <InputDefault 
                    placeholder="Salário R$"
                    type="number"
                    value={employeeData.wage}
                    onChange={({ target }) => {
                        handleEmployeeData({wage: parseFloat(target.value)})
                    }}
                />
                <InputDefault 
                    placeholder="Data de entrada"
                    type="date"
                    value={employeeData.entryDate && moment(employeeData.entryDate).format("YYYY-MM-DD")}
                    onChange={({ target }) => {
                        handleEmployeeData({entryDate: target.value})
                    }}
                />
                <InputDefault 
                    placeholder="Data de saída"
                    type="date"
                    value={employeeData.departureDate && moment(employeeData.departureDate).format("YYYY-MM-DD")}
                    onChange={({ target }) => {
                        handleEmployeeData({departureDate: target.value})
                    }}
                />
            </Stack>
        </ModalDefault>
    );
}