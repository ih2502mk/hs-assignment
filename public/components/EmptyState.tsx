import React, { FC, ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    color: lightgray;
    text-align: center;
    width: 100%;
`;

export const EmptyState: FC<ReactNode> = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};
