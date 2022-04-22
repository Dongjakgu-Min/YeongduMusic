import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from 'react-native';
import MediaMeta from 'react-native-media-meta';
import {useTheme} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {MusicPlayerNavigationProp} from '../../types/navigation';
import {Metadata} from '../../types/object';

import TrackPlayer, {useProgress, Event, State} from 'react-native-track-player';
import TextTicker from 'react-native-text-ticker';
import ImageColors from 'react-native-image-colors';
import SoundPlayer from 'react-native-sound-player';
import {useDispatch, useSelector} from 'react-redux';
import {playMusic, stopMusic} from '../redux/action';

const MusicPlayer = ({route}: MusicPlayerNavigationProp) => {
  const [metadata, setMetadata] = useState<Metadata>();
  const [background, setBackground] = useState<string>();
  const [sliding, setSliding] = useState<boolean>(false);
  const {position, buffered, duration} = useProgress(250);
  const reduxState = useSelector(
    (state: {reducer: {directory: string[]; isPlaying: boolean}}) => state,
  );
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const onSlidingStart = () => {
    setSliding(true);
  };

  const onSlidingEnd = async (percent: number) => {
    console.log(percent);
    await TrackPlayer.seekTo(percent);
    setSliding(false);
  };

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

  useEffect(() => {
    if (route.params.path && metadata) {
      const PlayMusic = async () => {
        await TrackPlayer.reset();
        await TrackPlayer.add([
          {
            url: `file://${route.params.path}`,
            title: metadata?.title,
            artist: metadata?.artist,
            album: metadata?.album,
            artwork: metadata?.thumb,
            duration: parseInt(metadata?.duration!, 10) / 1000,
          },
        ]);
        dispatch(playMusic());
        await TrackPlayer.play();
      };

      PlayMusic();
    }
  }, [metadata, route.params.path]);

  return (
    <View style={{backgroundColor: background}}>
      <ImageBackground
        source={{uri: `data:image/png;base64,${metadata?.thumb}`}}
        resizeMode="cover"
        blurRadius={100}>
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
              maximumValue={duration}
              minimumTrackTintColor={'#FFFFFF'}
              maximumTrackTintColor={'#FFFFFF'}
              thumbTintColor={'#FFFFFF'}
              value={position}
              onSlidingStart={() => onSlidingStart()}
              onSlidingComplete={onSlidingEnd}
            />
          </View>
          <View style={styles.btnContainer}>
            <CIcon name="skip-backward" size={38} color="#FFFFFF" />
            <Icon name="skip-previous" size={38} color="#FFFFFF" />
            {reduxState.reducer.isPlaying ? (
              <Icon
                name="pause"
                size={38}
                color="#FFFFFF"
                onPress={() => {
                  TrackPlayer.pause().then(() => {
                    dispatch(stopMusic());
                  });
                }}
              />
            ) : (
              <Icon
                name="play-arrow"
                size={38}
                color="#FFFFFF"
                onPress={() =>
                  TrackPlayer.play().then(() => {
                    dispatch(playMusic());
                  })
                }
              />
            )}
            <Icon name="skip-next" size={38} color="#FFFFFF" />
            <CIcon name="skip-forward" size={38} color="#FFFFFF" />
          </View>
        </View>
      </ImageBackground>
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
    width: Dimensions.get('window').width * 0.8,
  },
  backgroundImg: {},
});

export default MusicPlayer;
