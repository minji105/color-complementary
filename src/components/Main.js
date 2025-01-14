import React, { useState, useRef, useEffect } from "react";
import { colornames } from "color-name-list";
import nearestColor from 'nearest-color';
import { toPng } from "html-to-image";
import styles from './Main.module.scss';
import Header from "./Header";

export default function Main() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [compBgColor, setCompBgColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#000000");
  const [compTextColor, setcompTextColor] = useState("#ffffff");
  const [bgColorName, setBgColorName] = useState("White");
  const [compBgColorName, setCompBgColorName] = useState("Black");

  const sectionRef = useRef();
  const simplifyRef = useRef();

  const [font, setFont] = useState("Arial");

  // 폰트 업데이트
  const handleFontChange = (font) => {
    setFont(font);
  };

  // 색상 선택하면 텍스트와 배경 색 업데이트
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

  // 텍스트 색상 업데이트
  const updateTextColor = (color) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    // 분광 밝기 공식 사용
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return brightness > 128 ? ["#000000", "#ffffff"] : ["#ffffff", "#000"];
  };

  // 보색 찾기
  const getComplementaryColor = (color) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    const compR = (255 - r).toString(16).padStart(2, '0');
    const compG = (255 - g).toString(16).padStart(2, '0');
    const compB = (255 - b).toString(16).padStart(2, '0');

    return `#${compR}${compG}${compB}`;
  };

  // 화면 변경 감지 및 캡처 후 세션 저장
  useEffect(() => {
    if (!sectionRef.current || !simplifyRef.current) return;

    // MutationObserver로 화면 변경 감지
    const observer1 = new MutationObserver(() => {
      captureAndSaveToSession(sectionRef, "fullImage");
    });

    const observer2 = new MutationObserver(() => {
      captureAndSaveToSession(simplifyRef, "simplifyImage");
    });

    observer1.observe(sectionRef.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    observer2.observe(simplifyRef.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  const captureAndSaveToSession = async (ref, key) => {
    if (!ref.current) return;

    try {
      const dataUrl = await toPng(ref.current);
      sessionStorage.setItem(key, dataUrl); // 각 섹션에 대해 별도의 key로 세션에 저장
    } catch (err) {
      console.error("Error capturing the screenshot:", err);
    }
  };


  return (
    <div className={styles.main}>
      <Header
        bgColor={bgColor}
        compBgColor={compBgColor}
        font={font}
        handleFontChange={handleFontChange}
        handleColorChange={handleColorChange}
        sectionRef={sectionRef}
        simplifyRef={simplifyRef}
      />

      <div className={styles.sections}>
        <Section
          backgroundColor={bgColor}
          color={textColor}
          fontFamily={font}
          bgColorName={bgColorName} />
        <Section
          backgroundColor={compBgColor}
          color={compTextColor}
          fontFamily={font}
          bgColorName={compBgColorName} />
      </div>

      <div className={styles.simplifyImg} ref={simplifyRef}>
        <div style={{ backgroundColor: bgColor, color: textColor, fontFamily: font }}>
          <p className={styles.hexName}>{bgColor}</p>
        </div>
        <div style={{ backgroundColor: compBgColor, color: compTextColor, fontFamily: font }}>
          <p className={styles.hexName}>{compBgColor}</p>
        </div>
      </div>

      <div className={styles.sectionsImg} ref={sectionRef}>
        <Section
          backgroundColor={bgColor}
          color={textColor}
          fontFamily={font}
          bgColorName={bgColorName} />
        <Section
          backgroundColor={compBgColor}
          color={compTextColor}
          fontFamily={font}
          bgColorName={compBgColorName} />
      </div>
    </div>
  )
}

function Section({ backgroundColor, color, fontFamily, bgColorName }) {
  // rgb값 반환
  const getRGB = (color) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <section style={{ backgroundColor: backgroundColor, color: color, fontFamily: fontFamily }}>
      <p className={styles.hexName}>{backgroundColor}</p>
      <p className={styles.rgbName}>{getRGB(backgroundColor)}</p>
      <p>{bgColorName}</p>
      <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p>Color names may not be entirely accurate.</p>
      <p>&nbsp;Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal. Here is a copy of the drawing.
        <br />&nbsp;In the book it said: "Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion."
        <br />&nbsp;I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I succeeded in making my first drawing. My Drawing Number One. It looked something like this:
      </p>
    </section>
  )
}