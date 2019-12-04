export const LOCAL_STORAGE_KEY = "favorites";

export default function getFavoritesFromStorage(key = LOCAL_STORAGE_KEY) {
  const localStorageContent = JSON.parse(localStorage.getItem(key));

  let favorites = [];

  if (localStorageContent !== null && Array.isArray(localStorageContent))
    favorites = localStorageContent;

  return new Map(favorites.map(cityName => [cityName, undefined]));
}
