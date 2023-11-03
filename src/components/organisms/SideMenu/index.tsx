import { BrowserRouter, NavLink } from "react-router-dom";
import Grid from "components/layout/Grid"
import styled from "styled-components";

const SideMenuGrid = styled(Grid)`
    background-color: gray;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
`

const SideMenu = () => {
    return (
        <SideMenuGrid>
            <BrowserRouter>
                <NavLink to={"/products"}>商品一覧</NavLink>
                <NavLink to={"/"}>カート一覧</NavLink>
            </BrowserRouter>
        </SideMenuGrid>
    )
}

export default SideMenu