import React, { useState } from 'react';
import './App.scss';
import { url } from 'inspector';
import Button from './components/button/button';
import { AiOutlineMenu, AiOutlineHome, AiOutlineDashboard } from 'react-icons/ai';
import Dialog from './components/dialog/dialog';

export interface AppProps {
  className?: string;
  style?: React.CSSProperties;
}

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

        </div>
      </div>
    </>
  )
};

export default App;
