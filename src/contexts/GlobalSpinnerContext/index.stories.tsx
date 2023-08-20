import { Meta } from '@storybook/react'
import GlobalSpinner from './index'
import GlobalSpinnerContextProvider, { useGlobalSpinnerActionsContext } from 'contexts/GlobalSpinnerContext'
import Button from 'components/atoms/Button'
import { setTimeout } from 'timers/promises'

export default {
    title: 'organisms/GLobalSpinner',
} as Meta<typeof GlobalSpinner>

export const WithContextProvider = () => {
    const ChildComponent = () => {
        const setGlobalSpinner = useGlobalSpinnerActionsContext()
        const handleClick = () => {
            setGlobalSpinner(true)
            setTimeout(() => {
                setGlobalSpinner(false)
            }, 5000)
        }

        return (
            <>
                <GlobalSpinner />
                <Button onClick={handleClick}>スピナー表示</Button>
            </>
        )
    }

    return (
        <GlobalSpinnerContextProvider>
            <ChildComponent />
        </GlobalSpinnerContextProvider>
    )
}