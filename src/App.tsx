import React, {useState, useEffect} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {setupPlayer, addTrack} from '../musicPlayerServices';
import MusicPlayer from './screens/MusicPlayer';

// react native community/slider

function App(): React.JSX.Element {
  const [isPlayerReady, setPlayerisReady] = useState(false);

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }

    setPlayerisReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return <MusicPlayer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
