type Album = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

const searchAlbumsAPI = async (artist: string): Promise<Album[]> => {
  const artistNameURL = encodeURIComponent(artist).replace(/%20/g, "+");
  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI);
  const data: { results: Album[] } = await APIResponse.json();

  return data.results.map(
    (album): Album => ({
      artistId: album.artistId,
      artistName: album.artistName,
      collectionId: album.collectionId,
      collectionName: album.collectionName,
      collectionPrice: album.collectionPrice,
      artworkUrl100: album.artworkUrl100,
      releaseDate: album.releaseDate,
      trackCount: album.trackCount,
    })
  );
};

export default searchAlbumsAPI;
