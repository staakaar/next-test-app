import { Search, ShoppingCart, Person, GitHub } from '@mui/icons-material'
import SvgIcon from '@mui/material/SvgIcon'
import styled from 'styled-components'
import { theme } from 'themes'

export type ThemeColors = keyof typeof theme.colors

/** Interface */
interface IconWrapperProps {
    size: number
    cursor?: string
    color?: string
    backgroundColor?: string
}

const IconWrapper = styled.div<IconWrapperProps>`
    display: inline-block;
    font-size: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background-color: ${({backgroundColor}) => backgroundColor};
    cursor: ${({cursor}) => cursor ?? 'pointer'};
    color: ${({theme, color}) => {
        if (color) {
            return theme.colors[color]
        }
        return theme.colors
    }};
    svg: {
        display: block;
    }
`

export interface IconButtonProps {
    onClick?: React.MouseEventHandler<SVGSVGElement>
    color?: ThemeColors
    className?: string
    backgroundColor?: string
    size?: number
}

function withIconStyle(Icon: typeof SvgIcon): React.ComponentType<IconButtonProps> {
    const IconWithStyle = (props: IconButtonProps) => {
        const { onClick, className, size = 24, ...rest } = props
        const cursor = onClick ? 'pointer' : ''

        return (
            <IconWrapper cursor={cursor} size={size} {...rest}>
                <Icon
                    className={className}
                    fontSize="inherit"
                    color="inherit"
                    onClick={onClick}
                />
            </IconWrapper>
        )
    }

    return IconWithStyle
}

export const GitHubIcon = withIconStyle(GitHub)

export const PersonIcon = withIconStyle(Person)

export const SearchIcon = withIconStyle(Search)

export const ShoppingCartIcon = withIconStyle(ShoppingCart)

