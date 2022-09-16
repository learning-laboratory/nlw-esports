import './styles/main.css';
import logo from './assets/logo.svg'
import { GameAdBanner } from './components/GameAdBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
};

function App() {

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      });
  }, []);

  return (<div className="max-w-[1100px] mx-auto flex flex-col items-center my-20">

    <img className='w-[250px] mb-20' src={logo} alt="Logo" />

    <h1 className='text-6xl text-white font-black mb-16'>
      Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui
    </h1>

    <div className="grid grid-cols-6 gap-6 mb-6">
      {games.map(game => {
        return (<GameAdBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />);
      })}
    </div>

    <Dialog.Root>
      <CreateAdBanner />
      <CreateAdModal />
    </Dialog.Root>

  </div>);
}

export default App
