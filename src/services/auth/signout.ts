import { ApiContext, User } from '../../types/data'
import { fetcher } from 'utils'

const signout = async(context: ApiContext): Promise<void> => {
    return await fetcher(
        `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signout`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    )
}

export default signout