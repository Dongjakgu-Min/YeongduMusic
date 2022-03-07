declare module 'react-native-media-meta' {
  function get(path: string): Promise<{
    album: string;
    artist: string;
    comment?: string;
    duration: string;
    encoder?: string;
    height?: number;
    thumb?: string;
    title: string;
    track: string;
    width?: string;
  }>;
}
