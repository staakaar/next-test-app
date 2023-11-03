import Header from 'components/organisms/Header'
import Footer from 'components/organisms/Footer'
import Box from 'components/layout/Box'
import SideMenu from 'components/organisms/SideMenu'
import { styled } from 'styled-components'

interface LayoutProps {
    children?: React.ReactNode
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 100%;
    grid-template-rows: 60px 700px 100px;
`

const MainMenu = styled.div`
    width: 100%;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
`

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Container>
                <Header />
                <SideMenu />
                <MainMenu>
                    {children}
                </MainMenu>
                <Footer />
            </Container>
        </>
    )
}

export default Layout