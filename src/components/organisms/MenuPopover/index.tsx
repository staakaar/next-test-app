import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'

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
        <div className="text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-m px-4 py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        すべて
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div className='fixed top-10 right-full'>
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                        <Menu.Item>
                            <button
                                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Edit
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Duplicate
                            </button>
                        </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                        <Menu.Item>
                            <button
                                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Archive
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Move
                            </button>
                        </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                        <Menu.Item>
                            <button
                                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Delete
                            </button>
                        </Menu.Item>
                        </div>
                    </Menu.Items>
                    </div>
                </Transition>
            </Menu>
        </div>
    )
}

export default MenuPopover;