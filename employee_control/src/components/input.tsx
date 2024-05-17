import { Input, InputProps } from "@chakra-ui/react";
import React from "react";




export default function InputDefault(props: InputProps): React.ReactElement{
    return (
        <Input 
            width="100%"
            height={50}
            {...props}
        />
    );
}