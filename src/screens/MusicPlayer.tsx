import React, {useState} from 'react';
import {StyleSheet, Dimensions, View, FlatList, Image} from 'react-native';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import {playListData} from '../constants';
import Songinfo from '../components/Songinfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';

const {width} = Dimensions.get('window');
const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();


  // use trackplayer events used to listen to specific events realted to playback track
  
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack);
        break;
    }
  });

  const renderArtWork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image
              style={styles.albumArtImg}
              source={{uri: track?.artwork?.toString()}}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      />
      <Songinfo track={track} />
      <SongSlider />
      <ControlCenter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});
export default MusicPlayer;
