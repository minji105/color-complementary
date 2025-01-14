import React, { useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import styles from './Header.module.scss';

export default function Header({
  bgColor,
  compBgColor,
  font,
  handleFontChange,
  handleColorChange,
  sectionRef,
  simplifyRef
}) {
  const fonts = ["Arial", "Times New Roman", "Courier New"];

  const [previewImage, setPreviewImage] = useState({
    full: null,
    simplify: null,
  });

  // 이미지 저장
  const saveScreenshot = (ref) => {
    if (ref.current === null) return;

    toPng(ref.current)
      .then((dataUrl) => {
        download(dataUrl, `${bgColor}_${compBgColor}.png`);
      })
      .catch((err) => {
        console.error("Error capturing the screenshot:", err);
      });
  };

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    const fullImage = sessionStorage.getItem("fullImage");
    const simplifyImage = sessionStorage.getItem("simplifyImage");

    setPreviewImage({
      full: fullImage,
      simplify: simplifyImage,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPreviewImage({ full: null, simplify: null });
  };

  return (
    <>
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

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h1>Select a image to save</h1>
              <button className={styles.cancleBtn} onClick={handleModalClose}>cancle</button>
            </div>
            <div className={styles.modalImgs}>
              <div className={styles.preview}>
                <img src={previewImage.full} alt="Preview" className={styles.preview} />
                <button onClick={() => saveScreenshot(sectionRef)}>save</button>
              </div>
              <div className={styles.preview}>
                <img src={previewImage.simplify} alt="Preview" className={styles.preview} />
                <button onClick={() => saveScreenshot(simplifyRef)}>save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}