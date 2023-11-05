import Link from 'next/link'
import { Fragment } from 'react'
import ProductCard from 'components/organisms/ProductCard'
import ProductCardList from 'components/organisms/ProductCardList'
import useSearch from 'services/users/use-search'
import type { ApiContext, Product } from 'types/data'

const context: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

interface UserProductCardListContainerProps {
    userId: number
    products?: Product[]
}

const UserProductCardListContainer = ({ userId, products }: UserProductCardListContainerProps) => {
    const { products: userProducts } = useSearch(context, { userId, initial: products })

    return (
        <ProductCardList numberPerRow={6} numberPerRowForMobile={2}>
            {userProducts.map((p: any) => (
                <Fragment key={p.id}>
                    <Link href={`/products/${p.id}`} passHref>
                        <ProductCard
                            variant="small"
                            title={p.title}
                            price={p.price}
                            imageUrl={p.imageUrl}
                        />
                    </Link>
                </Fragment>
            ))}
        </ProductCardList>
    )
}

export default UserProductCardListContainer