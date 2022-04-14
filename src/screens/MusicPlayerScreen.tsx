import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from 'react-native';
import MediaMeta from 'react-native-media-meta';
import {useTheme} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {MusicPlayerNavigationProp} from '../../types/navigation';
import {Metadata} from '../../types/object';

import TextTicker from 'react-native-text-ticker';
import ImageColors from 'react-native-image-colors';
import TrackPlayer, {State} from 'react-native-track-player';
import SoundPlayer from 'react-native-sound-player';

const MusicPlayer = ({route}: MusicPlayerNavigationProp) => {
  const [metadata, setMetadata] = useState<Metadata>();
  const [background, setBackground] = useState<string>();
  const [playState, setPlayState] = useState<boolean>();
  const {colors} = useTheme();

  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    MediaMeta.get(route.params.path).then(res => {
      setMetadata(res);

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

    SoundPlayer.loadUrl(route.params.path);
  }, [isDark, route.params.path]);

  // useEffect(() => {
  //   const PlayMusic = async () => {
  //     await TrackPlayer.add({
  //       url: route.path!,
  //       title: metadata?.title,
  //       artist: metadata?.artist,
  //       album: metadata?.album,
  //       artwork: metadata?.thumb,
  //       duration: parseInt(metadata?.duration!, 10) / 1000,
  //     });

  //     const state = await TrackPlayer.getState();
  //     setPlayState(state === State.Playing);
  //   };

  //   PlayMusic();
  // }, [metadata, route.path]);

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
        <View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={
              metadata ? parseInt(metadata?.duration as string, 10) : 1000
            }
            minimumTrackTintColor={'#FFFFFF'}
            maximumTrackTintColor={'#FFFFFF'}
            thumbTintColor={'#FFFFFF'}
            value={100}
          />
        </View>
        <View style={styles.btnContainer}>
          <Icon name="skip-previous" size={50} color="#FFFFFF" />
          {/* {playState ? (
            <Icon
              name="pause"
              size={70}
              color="#FFFFFF"
              onPress={() => TrackPlayer.stop()}
            />
          ) : (
            <Icon
              name="play-arrow"
              size={70}
              color="#FFFFFF"
              onPress={() => TrackPlayer.play()}
            />
          )} */}
          <Icon name="skip-next" size={50} color="#FFFFFF" />
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
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
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
  slider: {
    width: Dimensions.get('window').width * 0.88,
    height: Dimensions.get('window').height * 0.15,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.6,
  },
});

export default MusicPlayer;
