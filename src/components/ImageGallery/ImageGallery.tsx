// ImageGallery.tsx
import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { ImageData } from "../../images-api";

interface ImageGalleryProps {
  items: ImageData[];
  onImageClick: (image: ImageData) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {items.map((item) => (
        <li className={css.galleryItem} key={item.id}>
          <ImageCard
            src={item.smallURL}
            alt={item.description}
            onClick={() => onImageClick(item)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
