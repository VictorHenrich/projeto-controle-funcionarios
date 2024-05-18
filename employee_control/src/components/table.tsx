'use client'

import React from "react";
import { TableContainer, Table, Tbody, Thead, Tr, Td, Th, Stack } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { MdEditDocument } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";


export interface HeaderItemProps{
    name: string
    item: any
}

export interface BodyItemProps{
    data: any,
    rows: {
        item: any,
        headerPropName: string
    }[]
}

export interface ButtonActionsProps{
    enable: boolean,
    text?: string,
    onEdit: (data: any) => void,
    onDelete: (data: any) => void
}


export interface TableDefaultProps{
    header: HeaderItemProps[],
    body: BodyItemProps[],
    ButtonActions?: ButtonActionsProps,
}

export default function TableDefault({
    header,
    body,
    ButtonActions = {
        enable: false,
        onDelete: () => null,
        onEdit: () => null
    }
}: TableDefaultProps){
    
    function captureOrganizedBodyList(): BodyItemProps[]{
        return body.map(itemData => {
            return {
                ...itemData,
                rows: itemData.rows.sort((a, b) => {
                    const indexA = header.findIndex((value) => value.name === a.headerPropName);

                    const indexB = header.findIndex((value) => value.name === b.headerPropName);

                    return indexA - indexB;
                })
            }
        });
    }

    return (
        <TableContainer 
            width="100%" 
            height="100%"
        >
            <Table>
                <Thead>
                    <Tr>
                        {header.map((data, index) => {
                            return (
                                <Th 
                                    key={index}
                                    fontSize={15}
                                    color="primary"
                                >
                                    {data.item}
                                </Th>
                            );
                        })}
                        {
                            ButtonActions.enable
                                ? <Th 
                                    textAlign="center" 
                                    fontSize={15}
                                    color="primary"
                                    >
                                        Ações
                                    </Th>
                                : null
                        }
                    </Tr>
                </Thead>
                <Tbody>
                {captureOrganizedBodyList().map((itemData, index) => {
                    return (
                        <Tr key={index}>
                            {
                                itemData.rows.map((row, index) => {
                                    return (
                                        <Td 
                                            key={index}
                                        >
                                            {row.item}
                                        </Td>
                                    )
                                })
                            }
                            {
                            ButtonActions.enable
                                ?   <Td>
                                        <Stack 
                                            spacing={5} 
                                            direction="row"
                                            justifyContent="center"
                                        >
                                            <IconButton 
                                                onClick={(event) => ButtonActions.onEdit(itemData.data)}
                                                aria-label="edit"
                                                fontSize={30}
                                                color="primary"
                                            >
                                                <MdEditDocument />
                                            </IconButton>
                                            <IconButton 
                                                onClick={(event) => ButtonActions.onDelete(itemData.data)}
                                                aria-label="delete"
                                                fontSize={30}
                                                color="red"
                                            >
                                                <MdDeleteForever />
                                            </IconButton>
                                        </Stack>
                                    </Td>
                                : null
                            }
                        </Tr>
                    );
                })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}