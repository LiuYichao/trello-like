import React, { ReactElement } from 'react';
import './button.scss';
import clsx from "clsx";


export interface ButtonProps extends React.Props<HTMLButtonElement> {
    id?: string,
    className?: string;
    style?: React.CSSProperties;
    size?: string,
    endIcon?: ReactElement,
    startIcon?: ReactElement,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,

}

const Button: React.FC<ButtonProps> = props => {

    const { className, style, children, ref, size = "normal", startIcon, endIcon, onClick, id } = props;
    const child = startIcon || endIcon ? <span>{children}</span> : children;

    return (
        <button
            style={style}
            ref={ref}
            className={clsx("button", className, {
                [`is-${size}`]: size,
            })}
            onClick={onClick}
            id={id}
        >
            {startIcon}
            {child}
            {endIcon}
        </button>
    );
}

export default Button;
