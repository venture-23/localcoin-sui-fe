'use client';

import { toast } from 'react-toastify';

interface Props {
  showToast?: any;
  setTimeOut?: any;
  message?: any;
}
const PullOnRefetch = (props?: Props) => {
  const handleTouchStart = (e: any) => {
    // Store the initial touch position
    startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: any) => {
    // Calculate the distance moved
    const deltaY = e.touches[0].clientY - startY;

    // Check if the user is pulling down and the scroll position is at the top
    if (deltaY > 0 && window.scrollY === 0) {
      // Prevent the default browser behavior
      e.preventDefault();

      // Update the height of the pull-to-refresh indicator (adjust as needed)
      const pullToRefreshHeight = Math.min(deltaY, 50);
      pullToRefreshIndicator.style.height = pullToRefreshHeight + 'px';
    }
  };

  const handleTouchEnd = () => {
    // Check if the user has pulled down enough (e.g., 50px) to trigger refresh
    if (pullToRefreshIndicator.clientHeight >= 50) {
      // Manually trigger the refetch function when the user pulls to refresh
      //   props.refetch();
      toast.success('yes pulling');
    }

    // Reset the pull-to-refresh indicator height
    pullToRefreshIndicator.style.height = '0';
  };

  let startY = 0;
  const pullToRefreshIndicator = document.getElementById('pullToRefreshIndicator');

  return (
    <div
      id="pullToRefreshIndicator"
      style={{
        height: '0',
        overflow: 'hidden',
        textAlign: 'center',
        lineHeight: '50px',
        borderBottom: '1px solid #ccc',
        transition: 'height 0.3s ease'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      Pull to Refresh
    </div>
  );
};

export default PullOnRefetch;
