import React from 'react';

function Loading() {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-center ">
        <div className="w-16 h-16 border-b-2 border-slate-700 rounded-full animate-spin" />
      </div>
    </div>
  );
}

export default Loading;
