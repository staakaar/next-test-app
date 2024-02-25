import { ThemeProvider } from 'styled-components'
import { render, act, screen, fireEvent, RenderResult } from '@testing-library/react'
import { theme } from 'themes'
import Dropzone from './DropZone'

describe('Dropzone', () => {
    let renderResult: RenderResult
    let handleDrop: jest.Mock

    beforeEach(() => {
        handleDrop = jest.fn()
        renderResult = render(
            <ThemeProvider theme={theme}>
                <Dropzone onDrop={handleDrop} />
            </ThemeProvider>
        )
    })

    afterEach(() => {
        renderResult.unmount()
    })

    it('ファイルがドロップされたらonDropが呼ばれる', async () => {
        const element = await screen.findByTestId('dropzone')
        fireEvent.drop(element, {
            dataTransfer: {
                files: [
                    new File(['(「◻︎_◻︎)'], 'chucknorris.png', {type: 'image/png'}),
                ],
            },
        })
        expect(handleDrop).toHaveBeenCalledTimes(1)
    })
})