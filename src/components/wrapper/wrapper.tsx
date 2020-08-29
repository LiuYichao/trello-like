import React from "react"
import './wrapper.scss';

export interface WrapperProps extends React.Props<HTMLDivElement> {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    title: string;
    uuid: string;
    dispatch: Function
}
const Wrapper: React.FC<WrapperProps> = props => {
    const { children = null, title, dispatch, uuid } = props;
    const addOnClick = () => {
        dispatch({
            type: "increment",
            uuid: uuid,
            payload:
            {
                name: "test",
                description: "",
                task: []
            },
        });
    }
    return (
        <>
            <div className="list-wrapper" >
                <div className="list-header">
                    <p>{title}</p>
                    <button className="add-button" onClick={addOnClick}>+</button>
                </div>
                <div className="list-cards">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Wrapper;