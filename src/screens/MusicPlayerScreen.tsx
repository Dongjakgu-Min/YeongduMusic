import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  useColorScheme,
} from 'react-native';
import MediaMeta from 'react-native-media-meta';
import {useTheme} from '@react-navigation/native';

import {MusicPlayerNavigationProp} from '../../types/navigation';
import {Metadata} from '../../types/object';

import TextTicker from 'react-native-text-ticker';
import ImageColors from 'react-native-image-colors';

const MusicPlayer = ({route}: MusicPlayerNavigationProp) => {
  const [metadata, setMetadata] = useState<Metadata>();
  const [background, setBackground] = useState<string>();
  const {colors} = useTheme();

  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    MediaMeta.get(route.params.path).then(res => {
      setMetadata(res);
      console.log([res.album, res.artist, res.duration, res.title]);

      if (res.thumb) {
        ImageColors.getColors(`data:image/png;base64,${res?.thumb}`).then(
          result => {
            if (result.platform === 'android') {
              isDark
                ? setBackground(result.darkVibrant)
                : setBackground(result.lightVibrant);
            }
          },
        );
      }
    });
  }, [isDark, route.params.path]);

  return (
    <View style={{backgroundColor: background}}>
      <View style={styles.metadataContainer}>
        <Image
          style={styles.albumCover}
          source={{uri: `data:image/png;base64,${metadata?.thumb}`}}
        />
        <View style={styles.titleContainer}>
          <TextTicker
            numberOfLines={1}
            scrollSpeed={50}
            loop
            bounce
            style={{color: colors.text, ...styles.artistFontSize}}>
            {metadata ? metadata.artist : 'Blabla'}
          </TextTicker>
          <TextTicker
            numberOfLines={1}
            scrollSpeed={50}
            loop
            bounce
            style={{color: colors.text, ...styles.titleFontSize}}>
            {metadata ? metadata.title : '블라블라'}
          </TextTicker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  metadataContainer: {
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 70,
  },
  titleContainer: {
    width: Dimensions.get('window').width * 0.8,
    marginTop: Dimensions.get('window').width * 0.1,
  },
  albumCover: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    alignContent: 'center',
    borderRadius: 5,
  },
  artistFontSize: {
    fontSize: 20,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  titleFontSize: {
    fontSize: 40,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
});

export default MusicPlayer;
