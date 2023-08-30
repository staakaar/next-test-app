import { ThemeProvider } from 'styled-components'
import { render, screen, act, fireEvent, RenderResult } from '@testing-library/react'
import { theme } from 'themes'
import Dropdown from './index'

describe('Dropdown', () => {
    let renderResult: RenderResult
    let handleChange: jest.Mock

    beforeEach(() => {
        handleChange = jest.fn()
        renderResult = render (
            <ThemeProvider theme={theme}>
                <Dropdown 
                    options={[
                        {value: 'used', label: '中古' },
                        {value: 'new', label: '新品' },
                    ]}
                    onChange={handleChange}
                />
            </ThemeProvider>
        )
    })

    afterEach(() => {
        renderResult.unmount()
    })

    it('ドロップダウンリストが表示されたらonDropが呼ばれる', async() => {
        await act(async () => {
            const element = await screen.findByTestId('dropdown-control')
            element && fireEvent.mouseDown(element)
        })

        const elements = await screen.getAllByTestId('dropdown-option')
        elements && fireEvent.click(elements[0])

        expect(handleChange).toHaveBeenCalledTimes(1)
    })
})