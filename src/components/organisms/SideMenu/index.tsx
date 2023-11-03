import Link from 'next/link'
import Grid from "components/layout/Grid"
import styled from "styled-components";
import Box from 'components/layout/Box';

const SideMenuGrid = styled.div`
    width: 200px;
    display: block;
    background-color: gray;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
`

const SideMenu = () => {
    return (
        <SideMenuGrid>
            <Box display={{ base: 'block', md: 'block' }}>
                <Link href={'/products'}>商品一覧</Link>
            </Box>
            <Box display={{ base: 'block', md: 'block' }}>
                <Link href={'/'}>カート一覧</Link>
            </Box>
        </SideMenuGrid>
    )
}

export default SideMenu