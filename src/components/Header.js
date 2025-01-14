import React, { useState, useRef, useEffect } from "react";
import { colornames } from "color-name-list";
import nearestColor from 'nearest-color';
import { toPng } from "html-to-image";
import download from "downloadjs";
import styles from './Header.module.scss';

export default function Header({
  bgColor,
  font,
  handleFontChange,
  handleColorChange,
  handleModalOpen
}) {
  const fonts = ["Arial", "Times New Roman", "Courier New"];

  return (
    <header className={styles.header}>
      <input
        type="color"
        value={bgColor}
        onChange={handleColorChange}
        aria-label="Color Picker"
      />
      <div className={styles.fontList}>
        {fonts.map((fontOption) => (
          <button
            key={fontOption}
            onClick={() => handleFontChange(fontOption)}
            style={{
              fontFamily: fontOption,
              background: font === fontOption ? '#f0f0f0' : 'none',
            }}
            aria-label={`Select font: ${fontOption}`}
          >
            Abc
          </button>
        ))}
      </div>
      <button onClick={handleModalOpen}>Save Screenshot</button>
    </header>
  );
}