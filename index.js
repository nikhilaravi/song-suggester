'use strict';
const fetch = require('isomorphic-fetch');
const apiRoot = 'http://ws.audioscrobbler.com/2.0/';
const apiKey = process.env.API_KEY;

exports.handler = function (event, context, callback) {
  const max = event.limit ? event.limit : 10;
  const url = `${apiRoot}?method=track.search&track=${event['query']}&limit=${max}&api_key=${apiKey}&format=json`;
  fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => {
    console.log('MATCHED TRACKS', JSON.stringify(json));
    if (json.results && json.results.trackmatches.track.length > 0) {
      const suggestions = json.results.trackmatches.track.map(track => {
        return {
          name: track.name,
          artist: track.artist,
          url: track.url,
          imageUrl: track.image[1]['#text']
        };
      });
      return callback(null, suggestions);
    } else {
      return callback(null, []);
    }
  })
  .catch(err => {
    console.log('Err retreiving song suggestions', err);
    return callback(err);
  });
};
