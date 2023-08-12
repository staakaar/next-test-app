export const Category = 'shoes' | 'clothes' | 'book'

export const Condition = 'new' | 'used'

export const User = {
    id: number,
    userName: string,
    displayName: string,
    email: string,
    profileImageUrl: string,
    description: string
}

export const product = {
    id: number,
    category: Category,
    title: string,
    description: string,
    imageUrl: string,
    blurDataUrl: string,
    price: number,
    condition: Condition,
    owner: User
}

export const ApiContext = {
    apiRootUrl: string
}
