import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'

const DropdownRoot = styled.div`
    position: relative;
    height: 38px;
`

const DropdownControl = styled.div<{ hasError?: boolean }>`
    position: relative;
    height: 38px;
    overflow: hidden;
    background-color: #ffffff;
    border: ${ ({ theme, hasError }) =>
        hasError ? `1px solid ${theme.colors.danger}` : `1px solid ${theme.colors.border}`
    }
    border-radius: 5px;
    box-sizing: border-box;
    cursor: default;
    outline: none;
    padding: 8px 52px 8px 12px;
`

const DropdownValue = styled.div`
    color: ${({ theme }) => theme.colors.text};
`

const DropdownPlaceholder = styled.div`
    color: #757575;
    font-size: ${({ theme }) => theme.fontSizes[1]};
    min-height: 20px;
    line-height: 20px;
`

const DropdownArrow = styled.div<{ isOpen?: boolean }>`
    border-color: ${({ isOpen }) => isOpen ? 'transparent transparent #222222' : '#222222 transparent transparent'};
    border-width: ${({ isOpen }) => (isOpen ? '0 5px 5px': '5px 5px 0;')};
    border-style: solid;
    content: ' ';
    display: block;
    height: 0;
    margin-top: -ceil(2.5);
    position: absolute;
    right: 10px;
    top: 16px;
    width: 0;
`

const DropdownMenu = styled.div`
    background-color: #ffffff;
    border: ${({ theme }) => theme.colors.border};
`