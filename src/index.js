import { fetchBreeds, fetchCatByBreed } from "./cat-search";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';


const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");

(async () => {
  try {
    const breeds = await fetchBreeds();
    const options = breeds.map((breed) => ({ text: breed.name, value: breed.id }));
    new SlimSelect({
      select: breedSelect,
      placeholder: "Select a breed",
      data: options,
    });
    breedSelect.addEventListener("change", onBreedSelectChange);
    loader.style.display = "none";
  } catch (err) {
    handleError(err);
  }
})();

async function onBreedSelectChange(event) {
  const selectedBreedId = event.target.value;
  loader.style.display = "block";
  catInfo.style.display = "none";

  try {
    const catData = await fetchCatByBreed(selectedBreedId);
    renderCatInfo(catData[0]);
  } catch (err) {
    handleError(err);
  } finally {
    loader.style.display = "none";
  }
}

function renderCatInfo(catData) {
  const image = document.createElement("img");
  image.src = catData.url;
  const name = document.createElement("h3");
  name.textContent = `Breed: ${catData.breeds[0].name}`;
  const description = document.createElement("p");
  description.textContent = `Description: ${catData.breeds[0].description}`;
  const temperament = document.createElement("p");
  temperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;

  catInfo.innerHTML = "";
  catInfo.appendChild(image);
  const infoContainer = document.createElement("div"); 
  infoContainer.appendChild(name);
  infoContainer.appendChild(description);
  infoContainer.appendChild(temperament);
  catInfo.appendChild(infoContainer);

  catInfo.style.display = "block";
}

function handleError(err) {
  catInfo.innerHTML = "";
  catInfo.style.display = "none";
  Notiflix.Report.failure("Error", "Oops! Something went wrong! Try reloading the page!", "OK");
  console.error(err);
}