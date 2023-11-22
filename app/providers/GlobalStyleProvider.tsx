"use client";

import React from "react";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}

export default function GlobalStyleProvider({ children }: Props) {
    return <GlobalStyles>{children}</GlobalStyles>;
}

const GlobalStyles = styled.div`
    height:100%;
`;
