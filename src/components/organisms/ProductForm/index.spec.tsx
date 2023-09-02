import { ThemeProvider } from 'styled-components'
import {
    render,
    act,
    screen,
    fireEvent,
    RenderResult,
} from '@testing-library/react'
import { theme } from 'themes'
import ProductForm from '.'

describe('productForm', () => {
    let renderResult: RenderResult
    let handleProductSave: jest.Mock

    global.URL.createObjectURL = () => 'https://test.com'

    beforeEach(() => {
        handleProductSave = jest.fn()
        renderResult = render(
            <ThemeProvider theme={theme}>
                <ProductForm onProductSave={handleProductSave} />
            </ThemeProvider>
        )
    })

    afterEach(() => {
        renderResult.unmount()
    })

    it('フォーム入力後、onProductSaveが呼ばれる', async () => {
        await act(async () => {
            const element = await screen.findByTestId('dropzone')
            fireEvent.drop(element, {
                dataTransfer: {
                    files: [
                        new File(['(「◻︎_◻︎)'], 'chucknorris.png', { type: 'image/png'}),
                    ],
                },
            })

            const inputUsernameNode = screen.getByPlaceholderText(/商品のタイトル/,) as HTMLInputElement
            fireEvent.change(inputUsernameNode, { target: { value: '商品' } })

            const inputPasswordNode = screen.getByPlaceholderText(/最高の商品です/,) as HTMLInputElement
            fireEvent.change(inputPasswordNode, { target: { value: 'テストテスト'}})

            const inputPriceNode = screen.getByPlaceholderText(/100/,) as HTMLInputElement
            fireEvent.click(screen.getByText('出品'))
        })

        expect(handleProductSave).toHaveBeenCalledTimes(1)
    })

    it('商品タイトル入力だけでは、バリデーションエラーでonProductSaveが呼ばれない', async() => {
        await act(async () => {
            const inputUsernameNode = screen.getByPlaceholderText(/商品のタイトル/,) as HTMLInputElement
            fireEvent.change(inputUsernameNode, { target: { value : '商品' } })

            fireEvent.click(screen.getByText('出品'))
        })

        expect(handleProductSave).toHaveBeenCalledTimes(0)
    })
})