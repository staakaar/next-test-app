import { render, screen, fireEvent, RenderResult } from '@testing-library/react'
import Button from '.'

describe('button', () => {
    let renderResult: RenderResult
    let handleClick: jest.Mock

    beforeEach(() => {
        handleClick = jest.fn()
        renderResult = render(
            <Button variant='primary' onClick={handleClick}>Button</Button>,
        )
    })

    afterEach(() => {
        renderResult.unmount()
    })

    it('ボタンを押した時にobClickが呼ばれる', () => {
        fireEvent.click(screen.getByText('Button'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})