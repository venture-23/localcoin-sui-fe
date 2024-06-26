import React, { useState } from 'react';
// import './BottomSheet.css'; // Ensure this points to the correct CSS file
interface props {
  divClass?: any;
}

function BottomSheet({ children, divClass }) {
  const [height, setHeight] = useState('20vh');
  const [startY, setStartY] = useState(0);
  const [endY, setEndY] = useState(0);
  const [touching, setTouching] = useState(false);

  const isBackdropVisible = height !== '20vh';

  const handleTouchStart = (e) => {
    console.log(e);
    setStartY(e.touches[0].clientY);
    setEndY(e.touches[0].clientY);
    setTouching(true);
  };

  const handleTouchMove = (e) => {
    if (!touching) return;
    setEndY(e.touches[0].clientY);
    let newHeight = startY - endY + (height === '20vh' ? 20 : 50);
    newHeight = Math.max(20, Math.min(50, newHeight));
    setHeight(`${newHeight}vh`);
  };

  const handleTouchEnd = () => {
    setTouching(false);
    if (Math.abs(startY - endY) > 50) {
      setHeight(endY < startY ? '50vh' : '20vh');
    } else {
      setHeight(height === '20vh' ? '50vh' : '20vh');
    }
  };

  const backdropClass = isBackdropVisible
    ? 'bottom-sheet-backdrop visible'
    : 'bottom-sheet-backdrop';

  return (
    <>
      <div className={backdropClass} onClick={() => setHeight('20vh')}></div>
      <div
        className={`bottom-sheet ${divClass} `}
        style={{ height }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </>
  );
}

export default BottomSheet;
