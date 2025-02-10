import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchImages, ImageData } from "../../images-api";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";

const perPage = 12;

const App: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchImages(query, perPage, page);
        setImages((prev) =>
          page === 1 ? data.images : [...prev, ...data.images]
        );
        setTotalPages(data.totalPages);

        if (data.images.length === 0 || page >= data.totalPages) {
          toast("We're sorry, but you've reached the end of search results.");
        }
      } catch (error) {
        setError(`Unable to load images: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setTotalPages(0);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: ImageData) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <Toaster
        position="top-center"
        toastOptions={{ className: css.toasterContainer }}
      />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <>
          <ImageGallery items={images} onImageClick={openModal} />
          {page < totalPages && !isLoading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}
      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          image={selectedImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
