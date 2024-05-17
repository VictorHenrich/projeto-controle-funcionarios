'use client'

import React from "react";
import ContainerDefault from "@/components/container";
import TableDefault, { HeaderItemProps, BodyItemProps } from "@/components/table";
import { Center } from "@chakra-ui/react";

export default function Home(): React.ReactElement {

    const [employees, setEmployees] = React.useState<BodyItemProps[]>([]);

    const headers: HeaderItemProps[] = [
        {
            item: "Nome",
            name: "employeeName"
        },
        {
            item: "Cargo",
            name: "employeeOffice"
        },
        {
            item: "Salário",
            name: "employeeWage"
        },
        {
            item: "Data de Entrada",
            name: "employeeEntryDate"
        },
        {
            item: "Data de Saída",
            name: "employeeDepartureDate"
        }
    ]

    return (
    <ContainerDefault>
        <Center>
            <TableDefault
                ButtonActions={{
                    enable: true,
                    onDelete: () => null,
                    onEdit: () => null
                }}
                header={headers}
                body={employees}
            />
        </Center>
    </ContainerDefault>
  );
}
