import React, { useState, useEffect } from "react";
import styles from './Main.module.scss';

export default function Main() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [compBgColor, setCompBgColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#000000");
  const [compTextColor, setcompTextColor] = useState("#ffffff");

  const updateTextColor = (color) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    // 분광 밝기 공식 사용
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return brightness > 128 ? ["#000000", "#ffffff"] : ["#ffffff", "#000"];
  };

  const getComplementaryColor = (color) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    const compR = (255 - r).toString(16).padStart(2, '0');
    const compG = (255 - g).toString(16).padStart(2, '0');
    const compB = (255 - b).toString(16).padStart(2, '0');

    return `#${compR}${compG}${compB}`;
  };

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setBgColor(selectedColor);
    setTextColor(updateTextColor(selectedColor)[0]); 
    setCompBgColor(getComplementaryColor(selectedColor));
    setcompTextColor(updateTextColor(selectedColor)[1]);
  };

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <p>Color Picker</p>
        <input
          type="color"
          value={bgColor}
          onChange={handleColorChange}
          aria-label="Color Picker"
        />
      </header>

      <div className={styles.sections}>
        <section style={{ backgroundColor: bgColor, color: textColor }}>
          <h1>h1</h1>
        </section>
        <section style={{ backgroundColor: compBgColor, color: compTextColor }}>
        <h1>h1</h1>
        </section>
      </div>
    </div>
  )
}