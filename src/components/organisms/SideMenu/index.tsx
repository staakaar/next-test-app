import Link from 'next/link'
import Grid from "components/layout/Grid"
import styled from "styled-components";
import Box from 'components/layout/Box';
import { MenuItem, MenuList, Paper, Stack } from '@mui/material';

const SideMenuGrid = styled.div`
    width: 200px;
    display: block;
    background-color: gray;
    padding: 20px 0;
`

const SideMenu = () => {
    return (
        <Stack direction="column" sx={{ width: '270px', margin: '30px', zIndex: "-1" }}>
            <Paper variant='outlined'>
                <MenuList className="w-64 h-80">
                    <MenuItem divider><Link href={'/products'}>商品一覧</Link></MenuItem>
                    <MenuItem divider sx={{ height: '40px' }}><Link href={'/'}>カート一覧</Link></MenuItem>
                    <MenuItem>その他</MenuItem>
                </MenuList>
            </Paper>
        </Stack>
        // <SideMenuGrid>
        //     <Box>
        //         <Link href={'/products'}>商品一覧</Link>
        //     </Box>
        //     <Box>
        //         <Link href={'/'}>カート一覧</Link>
        //     </Box>
        // </SideMenuGrid>
    )
}

export default SideMenu