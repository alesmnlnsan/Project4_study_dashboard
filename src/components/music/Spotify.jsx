import { useEffect, useState } from 'react';
import axios from 'axios';
import './Spotify.css';

export default function Spotify() {
  const CLIENT_ID = 'd33a8c6109e8402e93f971032cce5db8';
  const REDIRECT_URI = 'http://localhost:3003/music';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [artists, setArtists] = useState([]);
  const [showSpotify, setShowSpotify] = useState(true); // Add state for showing/hiding

  useEffect(() => {
    const hash = window.location.hash;
    let accessToken = window.localStorage.getItem('token');

    if (!accessToken && hash) {
      accessToken = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', accessToken);
    }

    setToken(accessToken || ''); 
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      console.log(error);
    }
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

  const handleToggleSpotify = () => {
    setShowSpotify(!showSpotify); // Toggle the show/hide state
  };

  return (
    <div>
      <div>
        <button onClick={handleToggleSpotify}>
          {showSpotify ? 'Hide Spotify' : 'Show Spotify'}
        </button>
      </div>
      {showSpotify && ( // Conditionally render based on the showSpotify state
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
      )}
    </div>
  );
}