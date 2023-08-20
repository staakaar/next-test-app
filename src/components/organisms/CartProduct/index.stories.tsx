import { Meta, StoryFn } from '@storybook/react'
import CartProduct from './index'

export default {
    title: 'Organisms/CartProduct',
    argTypes: {
        id: {
            control: { type: number },
            description: '商品ID',
            table: {
                type: { summary: 'number' },
            },
        },
        title: {
            control: { type: 'text' },
            description: '商品タイトル',
            table: {
                type: { summary: 'string' },
            },
        },
        imageUrl: {
            control: { type: 'text' },
            description: '商品画像URL',
            table: {
                type: { summary: 'number' },
            },
        },
        price: {
            control: { type: 'number' },
            description: '商品価格',
            table: {
                type: {summary: 'number' },

            },
        },
        onBuyButtonClick: {
            description: '購入ボタンを押した時のイベントハンドラ',
            table: {
                tpe: { summary: 'function' },
            },
        },
    },
} as Meta<typeof CartProduct>

const Template: StoryFn<typeof CartProduct> = (args) => {
    <CartProduct {...args} />
}

export const NiceShoes = Template.bind({})
NiceShoes.args = {
    id: 1,
    imageUrl: 'images/sample/1.jpg',
    title: 'ナイスシューズ',
    price: 3200,
}
