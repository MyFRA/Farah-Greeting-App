import { useIsFocused } from '@react-navigation/native'
import KeepAwake from '@sayem314/react-native-keep-awake'
import { useEffect, useState } from 'react'
import { Animated, BackHandler, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Sound from 'react-native-sound'
import Video from 'react-native-video'
import AsyncStorage from '@react-native-async-storage/async-storage';

var whoosh = new Sound('katawaredoki.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
})

export default function SplashScreen({ navigation }) {
    const [displayBgVideo, setDisplayBgVideo] = useState('flex')
    const [displayMainVideo, setDisplayMainVideo] = useState('none')
    const [mainScreenPlayFade, setMainScreenPlayFade] = useState(new Animated.Value(0))
    const { height } = Dimensions.get("window");
    const [allowClick, setAllowClick] = useState(false)
    const [hasWish, setHasWish] = useState(false)
    const isFocused = useIsFocused()



    useEffect(() => {
        if (isFocused) {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
                return () => { };
            })

            return () => backHandler.remove()
        } else {
            return () => { }
        }
    }, [isFocused])

    useEffect(() => {

        setTimeout(() => {
            setDisplayBgVideo('none')
            setDisplayMainVideo('flex')

        }, 49000);

        setTimeout(() => {
            Animated.timing(mainScreenPlayFade, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true // Add This line
            }).start();

            setAllowClick(true)
        }, 43000);

        setTimeout(() => {
            whoosh.setNumberOfLoops(-1);
            whoosh.play()
        }, 500);

        loadWish()
    }, [])

    const loadWish = async () => {
        try {
            const value = await AsyncStorage.getItem('farah_wish');
            if (value !== null) {
                setHasWish(true)
            }
        } catch (e) {
            // error reading value
        }
    }

    const styles = StyleSheet.create({
        backgroundVideo: {
            height: height,
            position: "absolute",
            top: 0,
            left: 0,
            alignItems: "stretch",
            bottom: 0,
            right: 0,
            display: displayBgVideo
        },
        backgroundMainVideo: {
            height: height,
            position: "absolute",
            top: 0,
            left: 0,
            alignItems: "stretch",
            bottom: 0,
            right: 0,
            display: displayMainVideo
        }
    });

    return (
        <View>
            <StatusBar hidden={true} />
            <KeepAwake />
            <Video
                source={require('./../assets/videos/background.mp4')}
                style={styles.backgroundVideo}
                muted={true}
                repeat={false}
                resizeMode={"cover"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />

            <Video
                source={require('./../assets/videos/main_video.mp4')}
                style={styles.backgroundMainVideo}
                muted={true}
                repeat={true}
                resizeMode={"cover"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />

            <Animated.View
                style={{ opacity: mainScreenPlayFade }}
            >
                <View
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: height }}
                >
                    <Text
                        style={{ fontSize: 30, color: '#eaeaea', fontFamily: 'LibreBaskerville-Bold' }}
                    >START</Text>
                    <View
                        style={{ width: '33%', height: 1, backgroundColor: '#FAFAFA', marginVertical: 14 }}
                    ></View>
                    <TouchableOpacity

                        onPress={() => {
                            if (allowClick) {
                                whoosh.pause()
                                navigation.navigate('BirthdayScreen')
                            }
                        }}
                    >
                        <Text
                            style={{ fontSize: 15, color: '#eaeaea', fontFamily: 'LibreBaskerville-Bold' }}
                        >TAP TO PLAY</Text>
                    </TouchableOpacity>

                    {
                        hasWish ?
                            <TouchableOpacity
                                onPress={() => {
                                    whoosh.pause()
                                    navigation.navigate('WishMainScreen')
                                }}
                                style={{
                                    backgroundColor: 'rgb(219 39 119)',
                                    paddingHorizontal: 23,
                                    marginTop: 30,
                                    shadowColor: 'rgba(255,255,255, 1)',
                                    shadowOffset: { width: 0, height: 0 },
                                    elevation: 16,
                                    shadowOpacity: 1, paddingVertical: 7, borderRadius: 4
                                }}
                            >
                                <Text
                                    style={{ fontSize: 12, color: '#eaeaea', fontFamily: 'LibreBaskerville-Regular' }}
                                >Lihat Harapan</Text>
                            </TouchableOpacity> : <></>
                    }
                </View>
            </Animated.View>
        </View>
    )
}