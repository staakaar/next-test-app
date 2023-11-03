import Link from 'next/link'
import styled from 'styled-components'
import { GitHubIcon } from 'components/atoms/IconButton'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

const Anchor = styled(Text)`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

const FooterBlock = styled.footer`
    position: fixed;
    width: 100%;
    bottom: 0;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
`

/** フッター */
const Footer = () => {
    return (
        <FooterBlock>
            <Flex flexDirection={{base: 'column', md: 'row'}}>
                <Box minWidth={{base: '100%', md: '120px'}} paddingRight={{ base: 0, md: 1 }}>
                    <nav>
                        <Box marginBottom={2}>
                            <Link href="/" passHref>
                                トップ
                            </Link>
                        </Box>
                        <Box marginBottom={2}>
                            <Link href="/" passHref>
                                採用
                            </Link>
                        </Box>
                        <Box marginBottom={2}>
                            <Link href="/" passHref>
                                お知らせ
                            </Link>
                        </Box>
                    </nav>
                </Box>
                <Box 
                    minWidth={{ base: '100%', md: '120px' }}
                    paddingRight={{ base: 0, md: 1 }}>
                    <nav>
                        <Box marginBottom={2}>
                            <Link href="/" passHref>
                                利用規約
                            </Link>
                        </Box>
                        <Box marginBottom={2}>
                            <Link href="/" passHref>
                                プライバシーポリシー
                            </Link>
                        </Box>
                        <Box marginBottom={2}>
                            <Link href="/" passHref>
                                配送と返品
                            </Link>
                        </Box>
                    </nav>
                </Box>
                <Box minWidth={{ base: '100%', md: '120px' }}>
                    <nav>
                        <Anchor
                            as="a"
                            href=""
                            target='_blank'>
                            <GitHubIcon size={22} />
                        </Anchor>
                    </nav>
                </Box>
            </Flex>
            <Box paddingTop={3} paddingBottom={2}>
                <Text>© 2021 Gijutsuhyoronsha Co., Ltd.. All rights reserved.</Text>
            </Box>
        </FooterBlock>
    )
}
export default Footer