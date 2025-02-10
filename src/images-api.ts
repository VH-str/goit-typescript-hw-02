// images-api.ts
import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export interface ImageData {
  id: string;
  smallURL: string;
  regularURL: string;
  description: string;
  likes: number;
  author: {
    name: string,
    portfolio: string | null,
    avatar: string,
  };
}

export const fetchImages = async (
  query: string,
  perPage: number,
  page: number
): Promise<{ images: ImageData[], totalPages: number }> => {
  const API_KEY = "knYehEae0WkMN_T4vgmU0_g8gFCAviIMZ5Y6O8W2n3Y";
  const response = await axios.get("search/photos", {
    params: { query, client_id: API_KEY, per_page: perPage, page },
  });

  return {
    images: response.data.results.map((image: any) => ({
      id: image.id,
      smallURL: image.urls.small,
      regularURL: image.urls.regular,
      description: image.alt_description || "No description",
      likes: image.likes,
      author: {
        name: image.user.name,
        portfolio: image.user.portfolio_url || "",
        avatar: image.user.profile_image.small,
      },
    })),
    totalPages: response.data.total_pages,
  };
};
