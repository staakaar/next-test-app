import Link from 'next/link'
import styled from 'styled-components'
import AppLogo from 'components/atoms/AppLogo'
import Button from 'components/atoms/Button'
import { PersonIcon, SearchIcon, ShoppingCartIcon } from 'components/atoms/IconButton'
import ShapeImage from 'components/atoms/ShapeImage'
import Spinner from 'components/atoms/Spinner'
import Box from 'components/layout/Box'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'
import BadgeIconButton from 'components/molecules/BadgeIconButton'
import { useAuthContext } from 'contexts/AuthContext'
import { useShoppingCartContext } from 'contexts/ShoppingCartContext'
import { theme } from 'themes'

const HeaderRoot = styled.header`
    padding: 16px 0px;
    border-bottom: 1px solid black;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
`

const Nav = styled(Flex)`
    & > span:not(:first-child) {
        margin-left: 16px;
    }
`

const NavLink = styled.span`
    display: inline;
`

const Anchor = styled(Text)`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

const Header = () => {
    const { cart } = useShoppingCartContext()
    const { authUser, isLoading } = useAuthContext()

    return (
        <HeaderRoot>
            <Flex paddingLeft={3} paddingRight={3} justifyContent="space-between">
                <Nav as="nav" height="56px" alignItems="center">
                    <NavLink>
                        <Link href="/" passHref>
                            <AppLogo />
                        </Link>
                    </NavLink>
                    <NavLink>
                        <Box display={{base: 'none', md: 'block'}}>
                            <Link href="search/book" passHref>
                                すべて
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Link href="search/book" passHref>
                                トップス
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Link href="search/book" passHref>
                                本
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Anchor as="a">シューズ</Anchor>
                        </Box>
                    </NavLink>
                </Nav>
                <Nav as="nav" height="56px" alignItems="center">
                    <NavLink>
                        <Box display={{ base: 'block', md: 'none' }}>
                            <Link href="/search" passHref>
                                <SearchIcon />
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Link href="/cart" passHref>
                            <BadgeIconButton
                                icon={<ShoppingCartIcon size={24} />}
                                size="24px"
                                badgeContent={cart.length === 0 ? undefined : cart.length}
                                badgeBackgroundColor="primary"
                            />
                        </Link>
                    </NavLink>
                    <NavLink>
                        {(() => {
                            if (authUser) {
                                return (
                                    <Link href={`/users/${authUser.id}`} passHref>
                                        <ShapeImage
                                            shape="circle"
                                            src={authUser.profileImageUrl}
                                            width={24}
                                            height={24}
                                            data-testid="profile-shape-image"
                                            alt={''}
                                        />
                                    </Link>
                                )
                            } else if (isLoading) {
                                return <Spinner size={20} strokeWidth={2} />
                            } else {
                                return (
                                    <Link href="/signin" passHref>
                                        <PersonIcon size={24}/>
                                    </Link>
                                )
                            }
                        }) ()}
                    </NavLink>
                    <NavLink>
                        <Link href="/sell" passHref>
                            出品
                        </Link>
                    </NavLink>
                </Nav>
            </Flex>
        </HeaderRoot>
    )
}

export default Header