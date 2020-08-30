import React, { useState, useReducer, useMemo } from 'react';
import './App.scss';
import { url } from 'inspector';
import Button from './components/button/button';
import { AiOutlineMenu, AiOutlineHome, AiOutlineDashboard } from 'react-icons/ai';
import Dialog from './components/dialog/dialog';
import Card from './components/card/card';

export interface AppProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface card {
  cardId: string;
  name: string;
  description: string;
  task: []
}

export interface list {
  title: string;
  uuid: string;
  cards: card[]
}

const listData: list = {
  title: "开发",
  uuid: "0001",
  cards: [
    {
      cardId: "card1",
      name: "看板列表开发",
      description: "",
      task: []
    },
    {
      cardId: "card2",
      name: "看板卡片开发",
      description: "",
      task: []
    }
  ]
}

const listState = { count: listData.cards.length, list: listData }


const App: React.FC<AppProps> = props => {

  const [anchorKanban, setAnchorKanban] = useState<Element | null>(null);
  const [anchorMenu, setAnchorMenu] = useState<Element | null>(null);

  const DialogOne = anchorMenu ? true : false;
  const DialogTwo = anchorKanban ? true : false;

  const handleClose = (anchorName: string) => {
    if (anchorName === "Menu") {
      setAnchorMenu(null);
    }

    if (anchorName === "Kanban") {
      setAnchorKanban(null);
    }
  }

  const reducer = (state = listState, action: any) => {
    switch (action.type) {
      case 'increment':
        return {
          count: state.count + 1, list: {
            title: state.list.title,
            uuid: state.list.uuid,
            cards: [...state.list.cards, action.payload]
          }
        };
      case 'decrement':
        const cards = state.list.cards.concat([])
        const idx = cards.findIndex((card: any) => {
          return card.cardId === action.payload;
        })
        cards.splice(idx, 1);
        return {
          count: state.count - 1, list: {
            title: state.list.title,
            uuid: state.list.uuid,
            cards: cards
          }
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, listState);

  const addOnClick = (uuid: string) => {
    setInputDivShow(true);
  }

  const addCard = () => {
    dispatch({
      type: "increment",
      payload: {
        cardId: "card" + (state.count + 1),
        name: inputValue,
        description: "",
        task: []
      }
    });
    setInputDivShow(false);
  }

  const [inputValue, setInputValue] = useState("");
  const [inputDivShow, setInputDivShow] = useState(false);

  return (
    <>
      <div className="App" style={{ backgroundImage: "url('../assets/BingWallpaper01.jpg')" }}>
        <div className="AppHeader">
          <Button onClick={(event) => {
            setAnchorMenu(event.currentTarget);
          }}>
            <AiOutlineMenu color="#fff" size={24} />
          </Button>
          <Button>
            <AiOutlineHome color="#fff" size={24} />
          </Button>
          <Button startIcon={<AiOutlineDashboard color="#fff" size={24} />} onClick={(event) => {
            setAnchorKanban(event.currentTarget);
          }}>
            看板
          </Button>
          <Dialog header="创建" open={DialogOne} anchorEl={anchorMenu} PopoverPosition={{ top: 3, left: 0 }} onClose={() => {
            handleClose('Menu')
          }}></Dialog>
          <Dialog header="看板" open={DialogTwo} anchorEl={anchorKanban} PopoverPosition={{ top: 3, left: 0 }} onClose={() => {
            handleClose('Kanban')
          }}></Dialog>
        </div>
        <div className="AppBody">
          <div className="board">
            <div className="list-wrapper">
              <div className="list-header">
                <p>
                  {state.list.title}
                </p>
                <button className="add-button" onClick={_ => { addOnClick(state.list.uuid) }}>+</button>
                <div className={inputDivShow ? "list-title-input" : "list-title-input-none"}>
                  <input value={inputValue} onChange={e => { setInputValue(e.target.value) }} placeholder="请输入任务名称" />
                  <button onClick={addCard}>添加</button>
                </div>
              </div>
              <div className="list-cards">
                {state.list.cards.map(((card: any, idx2: number) => {
                  return (
                    <Card title={card.name} cardId={card.cardId} dispatch={dispatch} key={idx2}></Card>
                  )
                }))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default App;
