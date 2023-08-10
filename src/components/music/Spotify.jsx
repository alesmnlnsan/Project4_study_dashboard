/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Spotify.css';

const CLIENT_ID = 'd33a8c6109e8402e93f971032cce5db8';
const REDIRECT_URI = 'http://localhost:3003/music';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const API_BASE_URL = 'https://api.spotify.com/v1';
const SCOPES = ['playlist-read-private', 'user-library-read', 'streaming'];
const scopeString = SCOPES.join('%20');

export default function Spotify() {
  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpotify, setShowSpotify] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;
    let accessToken = window.localStorage.getItem('spotifyToken');

    if (!accessToken && hash) {
      accessToken = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('spotifyToken', accessToken);
    }

    setToken(accessToken || '');

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify Web Playback SDK is ready');

      const player = new window.Spotify.Player({
        name: 'My Spotify Player',
        getOAuthToken: (cb) => cb(token),
      });

      player.addListener('ready', ({ device_id }) => {
        axios
          .put(
            `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
            {
              uris: [],
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            console.log('Player ready and waiting for playback...');
          })
          .catch((error) => {
            console.error('Error starting playback:', error);
          });

        player.addListener('player_state_changed', (state) => {
          if (state) {
            setIsPlaying(!state.paused);
          }
        });

        player.connect();
      });
    };
  }, []);

  const logout = () => {
    setToken('');
    setIsPlaying(false);
    window.localStorage.removeItem('spotifyToken');
  };

  const searchPlaylists = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${API_BASE_URL}/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: 'playlist',
          limit: 10,
        },
      });

      if (data.playlists && data.playlists.items) {
        setPlaylists(data.playlists.items);
      } else {
        setPlaylists([]);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const fetchAndPlayTracks = async (playlistId) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data && data.items && data.items.length > 0) {
        const trackUris = data.items.map((track) => track.track.uri);

        if (window.Spotify && window.Spotify.Player) {
          const player = new window.Spotify.Player({
            name: 'My Spotify Player',
            getOAuthToken: (cb) => cb(token),
          });

          player.addListener('ready', ({ device_id }) => {
            axios
              .put(
                `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
                {
                  uris: trackUris,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                console.log('Playing tracks...');
                setIsPlaying(true); // Set isPlaying to true when playback starts
              })
              .catch((error) => {
                console.error('Error playing tracks:', error);
              });
          });

          player.connect();
        }
      } else {
        console.log('No tracks found in the playlist.');
      }
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
    }
  };

  const pausePlayback = async () => {
    try {
      if (isPlaying) {
        await axios.put(
          'https://api.spotify.com/v1/me/player/pause',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Playback paused.');
        setIsPlaying(false);
      } else {
        await axios.put(
          'https://api.spotify.com/v1/me/player/play',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Playback resumed.');
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error pausing/resuming playback:', error);
    }
  };

  const nextTrack = async () => {
    try {
      await axios.post(
        'https://api.spotify.com/v1/me/player/next',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Skipped to the next track.');
    } catch (error) {
      console.error('Error skipping to the next track:', error);
    }
  };

  const toggleSpotifyArea = () => {
    setShowSpotify(!showSpotify);
  };

  return (
    <div className='Music'>
      <div className='toggle-button'>
        <button onClick={toggleSpotifyArea}>Toggle Spotify Area</button>
      </div>
      {showSpotify && (
        <header className='App-header'>
          <h1>Spotify React</h1>
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopeString}`}>
              Login to Spotify
            </a>
          ) : (
            <>
              <button onClick={logout}>Logout</button>
              <form onSubmit={searchPlaylists}>
                <input
                  type='text'
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <button type='submit'>Search Playlists</button>
              </form>
              {playlists.length > 0 && (
                <ul>
                  {playlists.map((playlist) => (
                    <li key={playlist.id}>
                      {playlist.name}{' '}
                      <button onClick={() => fetchAndPlayTracks(playlist.id)}>
                        Play Tracks
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </header>
      )}

      <div className='play-pause'>
        {isPlaying ? (
          <>
            <button onClick={pausePlayback}>Pause</button>
            <button onClick={nextTrack}>Next Track</button>
          </>
        ) : (
          <>
            <button onClick={pausePlayback}>Play</button>
            <button onClick={nextTrack}>Next Track</button>
          </>
        )}
      </div>
    </div>
  );
}
