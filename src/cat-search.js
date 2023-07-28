import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_iDgBR45ephXGhjNdNpzK9H896j9JuWNFQKLvF2NR5OqkXOfcifMzgVNHyB5eNWzZ";

export async function fetchBreeds() {
    try {
      const response = await axios.get("https://api.thecatapi.com/v1/breeds");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch breeds.");
    }
  }
  
  export async function fetchCatByBreed(breedId) {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch cat information.");
    }
  }

