import { useIsFocused } from "@react-navigation/native";
import KeepAwake from "@sayem314/react-native-keep-awake";
import { useEffect, useState } from "react";
import { BackHandler, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Sound from "react-native-sound";
import Video from "react-native-video";
import AsyncStorage from '@react-native-async-storage/async-storage';

var whoosh = new Sound('sore_wa_chiisana_hikari_no_youna.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
})

export default function MainScreen({ navigation }) {

    const isFocused = useIsFocused()
    const [hasWish, setHasWish] = useState(false)

    useEffect(() => {
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

    useEffect(() => {
        if (isFocused) {
            whoosh.setNumberOfLoops(-1);
            whoosh.play()
        }
    }, [isFocused])

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

    const styles = StyleSheet.create({
        backgroundMainVideo: {
            height: Dimensions.get('window').height,
            position: "absolute",
            top: 0,
            left: 0,
            alignItems: "stretch",
            bottom: 0,
            right: 0,
        }
    });

    return (
        <View>
            <StatusBar hidden={true} />
            <KeepAwake />

            <Video
                source={require('./../assets/videos/main_video.mp4')}
                style={styles.backgroundMainVideo}
                muted={true}
                repeat={true}
                resizeMode={"cover"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />

            <View
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('window').height }}
            >
                <Text
                    style={{ fontSize: 30, color: '#eaeaea', fontFamily: 'LibreBaskerville-Bold' }}
                >START</Text>
                <View
                    style={{ width: '33%', height: 1, backgroundColor: '#FAFAFA', marginVertical: 14 }}
                ></View>
                <TouchableOpacity
                    onPress={() => {
                        whoosh.pause()
                        navigation.navigate('BirthdayScreen')
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
        </View>
    )
}