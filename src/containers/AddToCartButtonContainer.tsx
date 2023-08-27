import Button from 'components/atoms/Button'
import { useShoppingCartContext } from 'contexts/ShoppingCartContext'
import type { Product } from 'types/data'

interface AddToCartButtonContainerProps {
    product: Product
    onAddToCartButtonClick?: (product: Product) => void
}

const AddToCartButtonContainer = ({
    product,
    onAddToCartButtonClick,
}: AddToCartButtonContainerProps) => {
    const { cart, addProductToCart } = useShoppingCartContext()
    const handleAddToCartButtonClick = () => {
        const productId = Number(product.id)
        const result = cart.findIndex((v)=> v.id === productId)

        if (result === -1) {
            addProductToCart(product)
        }
        onAddToCartButtonClick && onAddToCartButtonClick(product)
    }

    return (
        <Button
            width={{ base: '100%', md: '400px' }}
            height="66px"
            onClick={handleAddToCartButtonClick}
        >
            カートに追加
        </Button>
    )
}

export default AddToCartButtonContainer