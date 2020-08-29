import React from "react"
import './card.scss';

export interface CardProps extends React.Props<HTMLDivElement> {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    title: string;
    cardId: string;
    dispatch: Function;
}
const Card: React.FC<CardProps> = props => {
    const { title, dispatch, cardId } = props;
    const d = () => {
        dispatch({
            type: "decrement",
            payload: cardId
        });
    }
    return (
        <>
            <div className="list-card">
                <span className="list-card-title">{title}</span>
                <button className="add-button" onClick={_ => { d() }}>-</button>
            </div>
        </>
    )
}

export default Card;