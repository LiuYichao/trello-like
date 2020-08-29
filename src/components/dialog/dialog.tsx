import React, { useRef, useEffect } from 'react';
import './dialog.scss';
import clsx from 'clsx';
import { AiOutlineClose } from 'react-icons/ai';



export interface DialogProps extends React.Props<HTMLDivElement> {
    className?: string;
    style?: React.CSSProperties;
    header: string,
    open: boolean,
    anchorEl?: null | Element
    PopoverPosition?: PopoverPosition,
    onClose?: Function
}

export interface PopoverPosition {
    top: number;
    left: number;
}

const Dialog: React.FC<DialogProps> = props => {
    const { children, className, header, open, anchorEl, onClose, PopoverPosition = { top: 0, left: 0 } } = props;

    const DialogRef = useRef<HTMLDivElement>(null);

    const handleOnClose = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        if (onClose) {
            onClose()
        }
    }

    useEffect(() => {
        if (anchorEl && DialogRef.current) {
            const DOMRect = anchorEl.getBoundingClientRect();
            DialogRef.current.style.top = `${DOMRect.top + DOMRect.height + PopoverPosition.top}px`;
            DialogRef.current.style.left = `${DOMRect.left + PopoverPosition.left}px`;
        }
    }, [anchorEl])

    return (
        <>
            <div className={clsx(
                'dialog',
                className,
                open ? 'show' : 'hidden'
            )}
                ref={DialogRef}
            >
                <header className="header">
                    <div className="title">
                        {header}
                    </div>
                    <span className="close">
                        <AiOutlineClose onClick={handleOnClose}></AiOutlineClose>
                    </span>
                </header>
                {children}
            </div>
        </>
    );
}

export default Dialog;