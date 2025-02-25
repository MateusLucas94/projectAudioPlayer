type Song = {
  trackId: number;
  title: string;
  artist: string;
};

const FAVORITE_SONGS_KEY = "favorite_songs";
const TIMEOUT = 500;
const SUCCESS_STATUS = "OK";

if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY) || "[]")) {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
}

const readFavoriteSongs = (): Song[] =>
  JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY) || "[]");

const saveFavoriteSongs = (favoriteSongs: Song[]): void => {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));
};

const simulateRequest =
  <T,>(response: T) =>
  (callback: (res: T) => void): void => {
    setTimeout(() => {
      callback(response);
    }, TIMEOUT);
  };

export const getFavoriteSongs = (): Promise<Song[]> =>
  new Promise((resolve) => {
    const favoriteSongs = readFavoriteSongs();
    simulateRequest(favoriteSongs)(resolve);
  });

export const addSong = (song: Song): Promise<string> =>
  new Promise((resolve) => {
    if (song) {
      const favoriteSongs = readFavoriteSongs();
      saveFavoriteSongs([...favoriteSongs, song]);
    }
    simulateRequest(SUCCESS_STATUS)(resolve);
  });

export const removeSong = (song: Song): Promise<string> =>
  new Promise((resolve) => {
    const favoriteSongs = readFavoriteSongs();
    saveFavoriteSongs(favoriteSongs.filter((s) => s.trackId !== song.trackId));
    simulateRequest(SUCCESS_STATUS)(resolve);
  });
