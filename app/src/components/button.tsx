'use client'

import React from "react";
import { ButtonProps, Button, Text, TextProps } from "@chakra-ui/react";


export interface ButtonDefaultProps extends ButtonProps{
    text: string,
    TextProps?: TextProps
}

export default function ButtonDefault({
    text,
    TextProps = {},
    ...buttonProps
}: ButtonDefaultProps): React.ReactElement{
    return (
        <Button
            width="100%"
            height={50}
            backgroundColor="primary"
            {...buttonProps}
        >
            <Text color="secondary" fontSize={15} {...TextProps}>
                {text}
            </Text>
        </Button>
    );
}