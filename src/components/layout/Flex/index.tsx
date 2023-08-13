import styled from 'styled-components'
import Box, { BoxProps } from 'components/layout/Box'
import type {
    Responsive,
    CSSPropertyAlignItems,
    CSSPropertyAlignContent,
    CSSPropertyJustifyContent,
    CSSPropertyJustifyItems,
    CSSPropertyFlexDirection,
    CSSPropertyJustifySelf,
    CSSPropertyFlexWrap,
    CSSPropertyAlignSelf,
} from 'types/styles'
import { toPropValue } from 'utils/styles'

type FlexProps = BoxProps & {
    alignItems?: Responsive<CSSPropertyAlignItems>
    alignContent?: Responsive<CSSPropertyAlignContent>
    justifyContent?: Responsive<CSSPropertyJustifyContent>
    justifyItems?: Responsive<CSSPropertyJustifyItems>
    flexWrap?: Responsive<CSSPropertyFlexWrap>
    flexBasis?: Responsive<string>
    flexDirection?: Responsive<CSSPropertyFlexDirection>
    flexGrow?: Responsive<string>
    flexShrink?: Responsive<string>
    justifySelf?: Responsive<CSSPropertyJustifySelf>
    alignSelf?: Responsive<CSSPropertyAlignSelf>
    order?:Responsive<string>
}

const Flex = styled(Box)<FlexProps>`
    ${(props) => toPropValue('align-items', props.alignItems, props.theme)}
    ${(props)=>toPropValue('aligncontent',props.alignContent, props.theme)}
    ${(props)=>toPropValue('justifycontent',props.justifyContent, props.theme)}
    ${(props)=>toPropValue('justifyitems',props.justifyItems, props.theme)}
    ${(props)=>toPropValue('flexwrap',props.flexWrap, props.theme)}
    ${(props)=>toPropValue('flexbasis',props.flexBasis, props.theme)}
    ${(props)=>toPropValue('flexdirection',props.flexDirection, props.theme)}
    ${(props)=>toPropValue('flexgrow',props.flexGrow, props.theme)}
    ${(props)=>toPropValue('flexshrink',props.flexShrink, props.theme)}
    ${(props)=>toPropValue('justifyself',props.justifySelf, props.theme)}
    ${(props)=>toPropValue('alignself',props.alignSelf, props.theme)}
    ${(props)=>toPropValue('order',props.order, props.theme)}
`

Flex.defaultProps = {
    display: 'flex',
}

export default Flex