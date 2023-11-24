import Header from 'components/organisms/Header'
import Footer from 'components/organisms/Footer'
import Box from 'components/layout/Box'
import SideMenu from 'components/organisms/SideMenu'
import { styled } from 'styled-components'

interface LayoutProps {
    children?: React.ReactNode
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

const MainWrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 80vh;
`

const MainMenu = styled.div`
    width: 100%;
    height: 100%;
    margin: 20px, 0;
`

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Container>
                <Header />
                <MainWrapper>
                    <SideMenu />
                    <MainMenu>
                        {children}
                    </MainMenu>
                </MainWrapper>
                <Footer />
            </Container>
        </>
    )
}

export default Layout