import React from "react";
import {Content, Wrapper} from "./ProgressBar.styles";

// Types
type Props = {
    progress: number;
    title: string;
}

const ProgressBar: React.FC<Props> = ({ progress, title }) => (
    <Wrapper>
        {title && <span>{title}</span>}
        <Content progress={progress}>
        </Content>
    </Wrapper>
);

export default ProgressBar;