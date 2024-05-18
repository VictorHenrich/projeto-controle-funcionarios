'use client'

import React from "react";
import { EmployeeContext, EmployeeContextProps } from "./context";
import ModalDefault from "@/components/modal";
import { Text } from "@chakra-ui/react";
import Employee from "@/interfaces/employee";
import ExmployeeExclusionService from "@/services/employeeExclusionService";


export default function EmployeeModalExclusion(props: any){
    const newEmployee: Omit<Employee, "id"> = {
        name: "",
        office: "",
        wage: 0,
        entryDate: new Date()
    }

    const {
        openModalExclusion,
        employeeSelected,
        setOpenModalExclusion,
        setEmployeeSelected,
        loadAllEmployees
    } = React.useContext<EmployeeContextProps>(EmployeeContext);

    async function onConfirmExclusionEmployee(): Promise<void>{
        if(!employeeSelected.id) return;

        const employeeExclusionService = new ExmployeeExclusionService(employeeSelected);

        await employeeExclusionService.execute();

        await loadAllEmployees();

        setEmployeeSelected(newEmployee);

        setOpenModalExclusion(false);
    }

    function onCloseExclusionEmployee(): void{
        setOpenModalExclusion(false);
        setEmployeeSelected(newEmployee);
    }

    return (
        <ModalDefault 
            FooterProps={{
                onConfirm: onConfirmExclusionEmployee,
                onClose: onCloseExclusionEmployee,
                buttonMode: "edit",
                enable: true
            }}
            isOpen={openModalExclusion}
        >
            <Text 
                fontSize={20}
                width="100%"
            >
                Você tem certeza que gostaria de realizar a exclusão deste registro?
            </Text>
        </ModalDefault>
    );
}