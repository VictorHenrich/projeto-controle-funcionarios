'use client'

import React from "react";
import EmployeerProvider from "./context";
import EmployeeContainer from "./container";



export default function Home(): React.ReactElement {
    return (
        <EmployeerProvider>
            <EmployeeContainer />
        </EmployeerProvider>
  );
}
