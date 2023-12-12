import { Popover, Transition } from "@headlessui/react";
import { Button, Link, Menu, MenuItem, MenuList, Paper } from "@mui/material";
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
        <div>
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className="border-none inline-flex items-center rounded-m px-3 py-2 text-base font-medium"
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
                                <Popover.Panel
                                    className="
                                        absolute
                                        mt-3
                                        w-screen
                                        max-w-sm
                                        -translate-x-1/2
                                        transform
                                        px-4 
                                        sm:px-0
                                        lg:max-w-3xl"
                                >
                                    <Menu>
                                        {categories.map((category) => (
                                            <MenuItem className="w-4 h-4">
                                                <Link key={category.id}>
                                                    testtest
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Popover.Panel>
                            </Transition>
                        )}
                    </>
                )}
            </Popover>
        </div>
    )
}

export default MenuPopover;