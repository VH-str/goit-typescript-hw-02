// Loader.tsx
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={css.loaderContainer}>
      <ThreeDots className={css.loader} ariaLabel="loading" visible={true} />
    </div>
  );
};

export default Loader;
