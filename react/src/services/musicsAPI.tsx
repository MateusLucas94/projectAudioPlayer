type Music = {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  previewUrl: string;
};

const getMusics = async (id: number): Promise<Music[]> => {
  const request = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&entity=song`
  );
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
