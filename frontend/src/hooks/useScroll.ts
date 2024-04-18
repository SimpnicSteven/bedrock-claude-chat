import React, { RefObject } from 'react';

const useScroll = () => {
  const smoothScrollToBottom = (containerRef: RefObject<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;

    if (scrollHeight - scrollTop <= clientHeight + 10) return; // 已經在底部

    const targetScroll = scrollHeight;
    let currentScroll = scrollTop;

    const step = () => {
      const distance = targetScroll - currentScroll;
      const speed = Math.max(1, Math.abs(distance / 10));

      currentScroll += distance > 0 ? speed : -speed;

      if (container) {
        container.scrollTop = currentScroll;

        if (Math.abs(targetScroll - currentScroll) > 1) {
          requestAnimationFrame(step);
        }
      }
    };

    requestAnimationFrame(step);
  };

  const scrollToTop = (containerRef: RefObject<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  };

  return {
    smoothScrollToBottom,
    scrollToTop,
  };
};

export default useScroll;
