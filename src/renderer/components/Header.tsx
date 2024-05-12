import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeButton from './DarkModeButton';

function Header() {
  return (
    <div className="inset-0 h-24 flex justify-center items-center sticky bg-slate-300 dark:bg-slate-700 z-20 select-none">
      <div className="w-full flex flex-col">
        <div className="font-bold text-3xl text-black dark:text-white self-center">
          IMDb Top 250 Random Movie Picker
        </div>
        <div className="fixed right-0">
          <DarkModeButton />
        </div>
        <div className="flex flex-row text-black dark:text-white font-semibold">
          <Link to="/" className="mx-5 underline">
            Anasayfa
          </Link>
          <Link to="/unwatched-movies" className="mx-5 underline">
            İzlemediğim Filmler
          </Link>
          <Link to="/all-movies" className="mx-5 underline">
            Top 250 Tüm Filmler
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
