import { Popover, Transition } from "@headlessui/react";
import { Button, Link, MenuItem, MenuList, Paper } from "@mui/material";
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
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`border-none group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                        onMouseEnter={() => setIsMenuPopover(true)}
                    >
                        {/* <Button> */}
                            すべて
                        {/* </Button> */}
                    </Popover.Button>
                    {isMenuPopover && (
                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Popover.Panel static>
                                <Paper>
                                    {categories.map((category) => (
                                            <MenuList>
                                                <MenuItem><Link key={category.id}>aa</Link></MenuItem>
                                                <MenuItem><Link></Link></MenuItem>
                                                <MenuItem><Link></Link></MenuItem>
                                            </MenuList>
                                        
                                    ))}
                                </Paper>
                            </Popover.Panel>
                        </Transition>
                    )}
                </>
            )}
        </Popover>
    )
}

export default MenuPopover;