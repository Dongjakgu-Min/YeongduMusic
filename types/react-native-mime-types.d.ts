declare module 'react-native-mime-types' {
  function lookup(filenameOrExt: string): string | false;
  function contentType(filenameOrExt: string): string | false;
  function extension(typeString: string): string | false;
  function charset(typeString: string): string | false;
  const types: {[key: string]: string};
  const extensions: {[key: string]: string[]};
}
