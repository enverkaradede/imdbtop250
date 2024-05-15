import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'renderer/store/rootStore';
import { setFilterText } from 'renderer/store/slicers/generalReducer';

type className = string;

function SearchBar({ className }: { className?: className }) {
  const filterText = useSelector(
    (state: RootState) => state.generalOps.filterText,
  );
  const dispatch = useAppDispatch();

  const textOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    dispatch(setFilterText(e.target.value));
  };

  return (
    <div className={`flex flex-row justify-center ${className}`}>
      <div className="relative">
        <input
          type="text"
          className="pl-10 pr-4 py-2 border rounded-lg w-80"
          onChange={textOnChangeHandler}
          value={filterText}
        />
        <div
          className="absolute inset-y-0 left-0 pl-3
                    flex items-center
                    pointer-events-none"
        >
          <i className="fa-solid fa-magnifying-glass text-gray-400" />
        </div>
      </div>
    </div>
  );
}

SearchBar.defaultProps = { className: '' };

export default SearchBar;
