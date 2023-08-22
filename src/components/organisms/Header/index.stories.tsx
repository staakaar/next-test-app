import React, { useEffect } from 'react'
import { Meta } from '@storybook/react'
import Header from './index'
import { ShoppingCartContextProvider, useShoppingCartContext } from 'contexts/ShoppingCartContext'
import { AuthContextProvider } from 'contexts/AuthContext'

export default { title: 'organisms/Header' } as Meta<typeof Header>

export const NoLogin = () => <Header />

export const Login = () => {
    const authUser = {
        id: 1,
        userName: 'dummy',
        displayName: 'Taketo yoshida',
        email: 'test@example.com',
        profileImageUrl: '/images/sample/1.jpg',
        description: '',
    }

    const ChildComponent = () => {
        const { addProductToCart } = useShoppingCartContext()

        useEffect(() => {
            addProductToCart({
                id: 1,
                category: 'book',
                title: 'Product',
                description: '',
                imageUrl: '/images/sample/1.jpg',
                blurDataUrl: '',
                price: 1000,
                condition: 'used',
                owner: authUser,
            })
        }, [])

        return <Header />
    }

    return (
        <ShoppingCartContextProvider>
            <AuthContextProvider
                context={{ apiRootUrl: 'https://dummy' }}
                authUser={authUser}
            >
                <ChildComponent />
            </AuthContextProvider>
        </ShoppingCartContextProvider>
    )
}