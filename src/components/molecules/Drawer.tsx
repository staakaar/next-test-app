/*****************
 * import
 *****************/

import Button from "components/atoms/Button"
import { Children, useCallback, useEffect, useRef } from "react"
import { css, styled } from "styled-components"

/*****************
 * styled-component
 *****************/
const DrawerOverlay = styled.div<{isOpen : boolean}>`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    inset: 0;
    opacity: 0;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    pointer-events: none;
    cursor: pointer;
    background-color: rgb(0, 0, 0, 0.5);
    overscroll-behavior-y: contain;
    transition: opacity 0.3s ease-in-out;

    ${({isOpen}) => {
        if(isOpen) {
            return css`
                opacity: 1;
                pointer-events: auto;
            `
        }
    }}
    
`

const DrawerDialog = styled.div<{isOpen: boolean}>`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 11;
    overflow-y: auto;
    pointer-events: none;
    background-color: white;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;

    ${({isOpen}) => {
        if(isOpen) {
            return css`
                pointer-events: auto;
                transform: translateX(0);
            `
        }
    }}
`

/*****************
 * Props Type
 *****************/
type DrawerProps = {
    isOpen: boolean
    onClose: () => void
    children?: React.ReactNode
}

/*****************
 * Method
 *****************/

/*****************
 * Drawer Component
 *****************/
const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
    // Escキーでドロワーを閉じる
    const handleKeyDownEsc = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose()
        }
    }, [onClose])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDownEsc);
        return () => {
            document.removeEventListener('keydown', handleKeyDownEsc);
        }
    }, [handleKeyDownEsc])

    // フォーカスを当てる
    const btnRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (isOpen) {
            btnRef.current?.focus
        }
    }, [isOpen])

    return (
        <>
            <DrawerOverlay aria-hidden isOpen={isOpen} onClick={onClose} />
            <DrawerDialog aria-hidden={!isOpen} isOpen={isOpen} role="dialog" >
                <Button type="button" ref={btnRef} onClick={onClose}>
                    閉じる
                </Button>
                {children}
            </DrawerDialog>
        </>
    )

}

export default Drawer