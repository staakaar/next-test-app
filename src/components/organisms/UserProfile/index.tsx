import ShapeImage from "components/atoms/ShapeImage";
import Text from 'components/atoms/Text'
import Box  from 'components/layout/Box'
import Flex from 'components/layout/Flex'

interface UserProfileProps {
    variant?: 'normal' | 'small'
    username: string
    profileImageUrl: string
    numberOfProducts: number
    description?: string
}

const UserProfile = ({
    variant = 'normal',
    username,
    profileImageUrl,
    numberOfProducts,
    description,
}: UserProfileProps) => {
    const profileImageSize = variant === 'small' ? '100px' : '120px'

    return (
        <Flex>
            <Box minWidth={profileImageSize}>
                <ShapeImage
                    shape="circle"
                    quality="85"
                    src={profileImageUrl}
                    alt={username}
                    height={Number.parseInt(profileImageSize)}
                    width={Number.parseInt(profileImageSize)}
                />
            </Box>
            <Box padding={1}>
                <Flex
                    height="100%"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <Box>
                        <Text
                            as="p"
                            fontWeight="bold"
                            variant="mediumLarge"
                            marginTop={0}
                            marginBottom={1}
                        >
                            {username}
                        </Text>
                        <Text>
                            {numberOfProducts}点出品済み
                        </Text>
                        {variant === 'normal' && (
                            <Text margin={0} as="p">
                                {description}
                            </Text>
                        )}
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}

export default UserProfile