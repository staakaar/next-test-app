import { Popover } from "@headlessui/react";
import { Link, MenuItem, MenuList, Paper } from "@mui/material";
import { useState } from "react";

interface Category {
    id: number
    name: string
}

const categories = [
    {
        id: 1,
        name: "aaa"
    },
    {
        id: 2,
        name: "bbb"
    },
    {
        id: 3,
        name: "ccc"
    },
]

const MenuPopover = (/**categories: Category[]*/) => {
    const [isMenuPopover, setIsMenuPopover] = useState(false);

    return (
        <Popover>
            {({ open }) => (
                <>
                    <Popover.Button
                        className={``}
                        onMouseEnter={() => setIsMenuPopover(true)}
                        onMouseLeave={() => setIsMenuPopover(false)}
                    >
                        すべて
                    </Popover.Button>
                    {isMenuPopover && (
                        <Popover.Panel>
                            <div>
                                {categories.map((category) => (
                                    <Paper>
                                        <MenuList>
                                            <MenuItem><Link key={category.id}>aa</Link></MenuItem>
                                            <MenuItem><Link></Link></MenuItem>
                                            <MenuItem><Link></Link></MenuItem>
                                        </MenuList>
                                    </Paper>
                                ))}
                            </div>
                        </Popover.Panel>
                    )}
                </>
            )}
        </Popover>
    )
}

export default MenuPopover;