import { useEffect, useState } from "react";
import styles from "./Image.module.css";

function Image() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    generateRandomImage();
  }, []);

  const generateRandomImage = () => {
    const images = ["i1.png", "i2.png", "i3.png", "i4.png", "i5.png"];
    const randomIndex = Math.floor(Math.random() * images.length);
    setImageUrl(images[randomIndex]);
  };
  return (
    <div className={styles.imageFrame}>
      <img src={imageUrl} alt="image" />
    </div>
  );
}

export default Image;
