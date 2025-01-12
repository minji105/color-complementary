import React, { useState } from "react";
import { colornames } from "color-name-list";
import nearestColor from 'nearest-color';
import styles from './Main.module.scss';

export default function Main() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [compBgColor, setCompBgColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#000000");
  const [compTextColor, setcompTextColor] = useState("#ffffff");
  const [bgColorName, setBgColorName] = useState("White");
  const [compBgColorName, setCompBgColorName] = useState("Black");

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

  const getRGB = (color) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setBgColor(selectedColor);
    setTextColor(updateTextColor(selectedColor)[0]);

    const complementaryColor = getComplementaryColor(selectedColor);
    setCompBgColor(complementaryColor);
    setcompTextColor(updateTextColor(selectedColor)[1]);

    let colors = colornames.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
    const findNearest = nearestColor.from(colors);
    setBgColorName(findNearest(selectedColor).name);
    setCompBgColorName(findNearest(complementaryColor).name);
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
          <p className={styles.hexName}>{bgColor}</p>
          <p className={styles.rgbName}>{getRGB(bgColor)}</p>
          <p>{bgColorName}</p>
          <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p>abcdefghijklmnopqrstuvwxyz</p>
          <p>Color names may not be entirely accurate.</p>
          <p>&nbsp;Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal. Here is a copy of the drawing.
            <br/>&nbsp;In the book it said: "Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion."
            <br/>&nbsp;I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I succeeded in making my first drawing. My Drawing Number One. It looked something like this:
          </p>
        </section>
        <section style={{ backgroundColor: compBgColor, color: compTextColor }}>
          <p className={styles.hexName}>{compBgColor}</p>
          <p className={styles.rgbName}>{getRGB(compBgColor)}</p>
          <p>{compBgColorName}</p>
          <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p>abcdefghijklmnopqrstuvwxyz</p>
          <p>Color names may not be entirely accurate.</p>
          <p>&nbsp;Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal. Here is a copy of the drawing.
            <br/>&nbsp;In the book it said: "Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion."
            <br/>&nbsp;I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I succeeded in making my first drawing. My Drawing Number One. It looked something like this:
          </p>
        </section>
      </div>
    </div>
  )
}