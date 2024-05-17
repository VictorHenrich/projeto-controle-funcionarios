'use client'

import React from "react";
import { Center, CenterProps } from "@chakra-ui/react";



export default function ContainerDefault(props: CenterProps): React.ReactElement{
    return (
        <Center 
            width="100vw"
            height="100vh"
            {...props}
        />
    );
}