import React, { useEffect, useState } from 'react';

function DarkModeButton(): React.JSX.Element {
  const initialState: boolean = localStorage.getItem('darkMode')
    ? localStorage.getItem('darkMode') === 'true'
    : false;

  const [isEnabled, setIsEnabled] = useState<boolean>(initialState);

  const toggleDarkMode = (): void => {
    setIsEnabled(!isEnabled);
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isEnabled).toString());
  };

  useEffect((): void => {
    document.body.classList.toggle(
      'dark',
      localStorage.getItem('darkMode') === 'true',
    );
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`text-white cursor-pointer fa-solid fa-${
        isEnabled ? 'sun' : 'moon'
      } fa-lg mx-5 mt-2 ml-2 mr-2 p-3 flex self-start`}
      onClick={toggleDarkMode}
      onFocus={toggleDarkMode}
    />
  );
}

export default DarkModeButton;
