'use client';
import React from 'react';
import styles from './SpaceTravel.module.css';

function Star() {
  // Randomize star position and animation delay
  const translateX = Math.floor(Math.random() * 2000) - 1000; // Range from -1000px to 1000px
  const translateY = Math.floor(Math.random() * 2000) - 1000; // Range from -1000px to 1000px
  const delay = Math.random() * 2; // Random delay between 0s and 2s

  return (
    <div
      className={styles.star}
      style={
        {
          '--translate-x': `${translateX}px`,
          '--translate-y': `${translateY}px`,
          animationDelay: `${delay}s`
        } as React.CSSProperties
      }
    ></div>
  );
}

function SpaceTravel({ messageToDisplay }: { messageToDisplay?: string }) {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-full max-h-80">
        {Array.from({ length: 100 }, (_, index) => (
          <Star key={index} />
        ))}
      </div>
      {!!messageToDisplay && (
        <div key={messageToDisplay} className={styles.message}>
          {messageToDisplay}
        </div>
      )}
    </div>
  );
}
export { SpaceTravel };
