# song-suggester

A lambda function that retrieves song suggestions from the Last.fm API

The event object expects keys:

- limit: (Int) - The number of results to retrieve (default 10)
- query: (String) - The name or part of the name of the song to search for

The lambda returns an array of objects of the form:

```js
{
  name:
  artist:
  url:
  imageUrl
}
```
