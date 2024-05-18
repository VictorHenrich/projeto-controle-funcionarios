'use client'

import React from "react";
import TableDefault, { HeaderItemProps } from "@/components/table";
import { EmployeeContext } from "./context";
import Employee from "@/interfaces/employee";



export default function EmployeeTable(props: any): React.ReactElement{
    const {
        setOpenModalExclusion,
        setOpenModalEdit,
        setEmployeeSelected,
        employees
    } = React.useContext(EmployeeContext);

    const headers: HeaderItemProps[] = [
        {
            item: "Nome",
            name: "name"
        },
        {
            item: "Cargo",
            name: "office"
        },
        {
            item: "Salário",
            name: "wage"
        },
        {
            item: "Data de Entrada",
            name: "entryDate"
        },
        {
            item: "Data de Saída",
            name: "departureDate"
        }
    ];

    function onDeleteEmployee(data: Employee): void{
        setEmployeeSelected(data);
        setOpenModalExclusion(true);
    }

    function onEditEmployee(data: Employee): void{
        setEmployeeSelected(data);

        setOpenModalEdit(true);
    }

    return (
        <TableDefault
            ButtonActions={{
                enable: true,
                onDelete: onDeleteEmployee,
                onEdit: onEditEmployee
            }}
            header={headers}
            body={employees}
        />
    );
}