'use client'

import React from "react";
import ContainerDefault from "@/components/container";
import TableDefault, { HeaderItemProps, BodyItemProps } from "@/components/table";
import { Center, IconButton, Stack, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import Employee from "@/interfaces/employee";
import ExmployeeListingService from "@/services/employeeListingService";
import ModalDefault from "@/components/modal";
import InputDefault from "@/components/input";


interface ModalEditProps{
    open: boolean,
    butttonConfirmName: string
}

export default function Home(): React.ReactElement {
    const newEmployee: Omit<Employee, "id"> = {
        name: "",
        office: "",
        wage: 0,
        entryDate: new Date()
    }

    const [modalEditData, setModalEditData] = React.useState<ModalEditProps>({
        open: false,
        butttonConfirmName: "Cadastrar"
    });

    const [openModalExclusion, setOpenModalExclusion] = React.useState<boolean>(false);

    const [employees, setEmployees] = React.useState<BodyItemProps[]>([]);

    const [employeeSelected, setEmployeeSelected] = React.useState<Employee | Omit<Employee, "id">>(newEmployee);

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

    async function loadAllEmployees(): Promise<void>{
        const employeeListingService = new ExmployeeListingService();

        const employees: Employee[] = await employeeListingService.execute();

        setEmployees(employees.map(employee => {
            return {
                data: employee,
                rows: [
                    {
                        headerPropName: "employeeName",
                        item: employee.name
                    },
                    {
                        headerPropName: "employeeOffice",
                        item: employee.office
                    },
                    {
                        headerPropName: "employeeWage",
                        item: employee.wage
                    },
                    {
                        headerPropName: "employeeEntryDate",
                        item: employee.entryDate
                    },
                    {
                        headerPropName: "employeeDepartureDate",
                        item: employee.departureDate
                    }
                ]
            }
        }));
    }

    function onEditEmployee(data: Employee): void{
        setEmployeeSelected(data);
    }

    function onDeleteEmployee(data: Employee): void{
        setEmployeeSelected(data);
        setOpenModalExclusion(true);
    }

    async function onConfirmExclusionEmployee(): Promise<void>{

    }

    function onCloseExclusionEmployee(): void{
        setOpenModalExclusion(false);
        setEmployeeSelected(newEmployee);
    }

    function onCreateEmployee(): void{
        setModalEditData({ 
            butttonConfirmName: "Cadastrar",
            open: true
        });
    }

    function onCloseEditEmployee(): void{
        setModalEditData({ 
            butttonConfirmName: "Cadastrar",
            open: false
        });
    }

    async function onConfirmEditEmployee(): Promise<void>{

    }

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
                <TableDefault
                    ButtonActions={{
                        enable: true,
                        onDelete: onDeleteEmployee,
                        onEdit: onEditEmployee
                    }}
                    header={headers}
                    body={employees}
                />

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
                <ModalDefault
                    FooterProps={{
                        onConfirm: onConfirmEditEmployee,
                        onClose: onCloseEditEmployee,
                        buttonMode: "edit",
                        enable: true,
                        buttonCloseName: "Cancelar",
                        butttonConfirmName: modalEditData.butttonConfirmName
                    }}
                    isOpen={modalEditData.open}
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
                            value={employeeSelected.name}
                        />
                        <InputDefault 
                            placeholder="Cargo"
                            type="text"
                            value={employeeSelected.office}
                        />
                        <InputDefault 
                            placeholder="Salário R$"
                            type="number"
                            value={employeeSelected.wage}
                        />
                        <InputDefault 
                            placeholder="Data de entrada"
                            type="date"
                            value={employeeSelected.entryDate}
                        />
                        <InputDefault 
                            placeholder="Data de saída"
                            type="date"
                            value={employeeSelected.departureDate}
                        />
                    </Stack>
                </ModalDefault>
            </Center>
        </ContainerDefault>
  );
}
