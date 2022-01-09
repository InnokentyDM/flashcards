import React from "react";

// Styles
import { Wrapper, Content, Menu } from './Header.styles';
import {Link} from "react-router-dom";

const Header: React.FC = () => (
    <Wrapper>
        <Content>
            <Link to='/' ><h1>FlashCards</h1></Link>
            <Menu>
                <Link to='/'><span>Home</span></Link>
                <Link to='/piles'><span>Piles</span></Link>
            </Menu>
        </Content>
    </Wrapper>
)

export default Header;
