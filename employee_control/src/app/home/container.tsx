'use client'

import React from "react";
import ContainerDefault from "@/components/container";
import { Center, IconButton } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { EmployeeContext } from "./context";
import EmployeeTable from "./table";
import EmployeeModalEdit from "./modalEdit";
import EmployeeModalExclusion from "./modalExclusion";

export default function EmployeeContainer(): React.ReactElement{
    const {
        setOpenModalEdit,
        setEmployeeSelected,
        loadAllEmployees
    } = React.useContext(EmployeeContext);

    function onCreateEmployee(): void{
        setEmployeeSelected(null);
        
        setOpenModalEdit(true);
    }

    React.useEffect(()=> {
        loadAllEmployees();
    }, []);

    return (
        <ContainerDefault>
            <Center
                position="relative"
                width="80%"
                height="80%"
                backgroundColor="secondary"
                borderRadius={20}
                padding={5}
            >
                <IconButton
                    position="absolute"
                    top={0}
                    right={-20}
                    aria-label="add"
                    colorScheme="green"
                    onClick={onCreateEmployee}
                >
                    <MdAdd />
                </IconButton>
                <EmployeeTable />
                <EmployeeModalEdit />
                <EmployeeModalExclusion />
            </Center>
        </ContainerDefault>
    );
}