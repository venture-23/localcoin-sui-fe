import React from 'react';

const loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black/5">
      <button type="button" className="... bg-red-500" disabled>
        <svg className="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24"></svg>
        Processing...
      </button>
    </div>
  );
};

export default loader;
