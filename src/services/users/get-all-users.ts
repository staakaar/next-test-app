import { ApiContext } from "types/data"
import { fetcher } from "utils"

export type AllUserProps = {
    userId?: number
}

const getAllUsers =  async (context: ApiContext) => {
    return await fetcher(
        `${context.apiRootUrl}/users/`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Context-Type': 'application/json'
            },
        },
    )
}
export default getAllUsers