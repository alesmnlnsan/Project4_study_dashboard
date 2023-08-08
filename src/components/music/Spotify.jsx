/** @format */

import { useEffect, useState } from 'react';
import axios from 'axios';
import './Spotify.css';

export default function Spotify() {
  const CLIENT_ID = 'd33a8c6109e8402e93f971032cce5db8';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let accessToken = window.localStorage.getItem('token');

    if (!token && hash) {
      accessToken = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', accessToken);
      setToken(accessToken);
    }
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: 'artist',
      },
    });

    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={'100%'} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}

        {token ? (
          <form onSubmit={searchArtists}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        ) : (
          <h2>Please login</h2>
        )}

        {renderArtists()}
      </header>
    </div>
  );
}


//   const [searchQuery, setSearchQuery] = useState('yoasobi');
//   const [searchResults, setSearchResults] = useState([]);
//   const [currentTrack, setCurrentTrack] = useState('');

//   const getAccessToken = async () => {
//     const credentials = btoa(`${clientId}:${clientSecret}`);
//     const response = await axios.post(
//       tokenEndpoint,
//       'grant_type=client_credentials',
//       {
//         headers: {
//           Authorization: `Basic ${credentials}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );
//     return response.data.access_token;
//   };

//   const searchMusic = async (searchQuery, accessToken) => {
//     const response = await axios.get(
//       `${searchEndpoint}?q=${searchQuery}&type=track`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     const tracks = response.data.tracks.items;
//     const filteredTracks = tracks.filter(
//       (track) => track.preview_url && track.duration_ms >= 60000
//     );
//     return filteredTracks;
//   };

//   const handleSearch = async (event) => {
//     event.preventDefault();
//     const accessToken = await getAccessToken();
//     const query = searchQuery.trim();
//     setSearchQuery(query);

//     const tracks = await searchMusic(query, accessToken);
//     setSearchResults(tracks);

//     if (tracks.length > 0) {
//       setCurrentTrack(tracks[0].preview_url);
//     } else {
//       setCurrentTrack('');
//     }
//   };

//   useEffect(() => {}, [searchQuery]);

//   const playTrack = (trackUrl) => {
//     setCurrentTrack(trackUrl);
//   };

//   return (
//     <div className='App'>
//       <h1>Search Spotify</h1>
//       <form onSubmit={handleSearch}>
//         <input
//           type='text'
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder='Enter artist, song, or album'
//         />
//         <button type='submit'>Search</button>
//       </form>

//       <h2>Search Results</h2>
//       <ul>
//         {searchResults.map((track, index) => (
//           <li key={index}>
//             {`${index + 1}. ${track.name} - ${track.artists
//               .map((artist) => artist.name)
//               .join(', ')}`}
//             <button onClick={() => playTrack(track.preview_url)}>Play</button>
//           </li>
//         ))}
//       </ul>

//       {currentTrack && (
//         <audio controls autoPlay={false} src={currentTrack} type='audio/mpeg' />
//       )}
//     </div>
//   );
// }
