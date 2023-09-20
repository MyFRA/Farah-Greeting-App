import KeepAwake from "@sayem314/react-native-keep-awake";
import { useEffect, useState } from "react";
import { Animated, BackHandler, Button, Dimensions, ImageBackground, StatusBar, Text, Touchable, TouchableOpacity, View } from "react-native";
import Draggable from "react-native-draggable";
import FastImage from "react-native-fast-image";
import Sound from "react-native-sound";
import ParticlesBg from 'react-native-particles-bg';
import { useIsFocused } from "@react-navigation/native";

var whoosh = new Sound('itsumo_nando_demo.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
})

export default function BirthdayScreen({ navigation }) {
    const [displayCandle1, setDisplayCandle1] = useState('none')
    const [displayCandle2, setDisplayCandle2] = useState('none')
    const [showParticles, setShowParticles] = useState(false)
    const [fadeTextHappy, setFadeTextHappy] = useState(new Animated.Value(0))
    const [fadeTextFarah, setFadeTextFarrah] = useState(new Animated.Value(0))
    const [bgColor, setBgColor] = useState('rgba(0, 0, 0, 0.1)')
    const [bgButtonBuatHarapan, setBgButtonBuatHarapan] = useState('rgb(107 114 128)')
    const [enableButtonWishes, setEnableButtonWishes] = useState(false)
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            if (!whoosh.isPlaying()) {
                whoosh.play()
            }

            const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
                whoosh.stop()
                setDisplayCandle1('none')
                setDisplayCandle2('none')
                setShowParticles(false)
                setFadeTextHappy(new Animated.Value(0))
                setFadeTextFarrah(new Animated.Value(0))
                setBgColor('rgba(0, 0, 0, 0.1)')
                setBgButtonBuatHarapan('rgb(107 114 128)')
                setEnableButtonWishes(false)
                navigation.navigate('MainScreen')
                return () => { };
            })

            return () => backHandler.remove()
        } else {
            return () => { }
        }
    }, [isFocused])

    useEffect(() => {
        if (displayCandle1 == 'flex' && displayCandle2 == 'flex') {
            whoosh.play()

            setShowParticles(true)
            Animated.timing(fadeTextHappy, {
                toValue: 1,
                duration: 3500,
                useNativeDriver: true
            }).start();

            Animated.timing(fadeTextFarah, {
                toValue: 1,
                duration: 3500,
                useNativeDriver: true
            }).start();

            setBgColor('rgba(0, 0, 0, 0.5)')
            setBgButtonBuatHarapan('rgb(219 39 119)')
            setEnableButtonWishes(true)
        }
    }, [displayCandle1, displayCandle2])

    let config = {
        num: [4, 7],
        rps: 0.1,
        radius: [5, 40],
        life: [1.5, 3],
        v: [2, 3],
        tha: [-50, 50],
        alpha: [0.6, 0],
        scale: [.1, 0.9],
        position: "all",
        //color: ["random", "#ff0000"],
        cross: "dead",
        random: 10
    };

    return (
        <View
            style={{ flex: 1, justifyContent: 'center' }}
        >
            <StatusBar hidden={true} />
            <KeepAwake />

            <View style={{ position: 'relative', flex: 1 }}>
                <ImageBackground source={require('./../assets/images/birthday_screen_bg.jpg')} style={{ flex: 1 }} resizeMode="cover">
                    <View style={{ backgroundColor: bgColor, flex: 1 }}>
                        {
                            showParticles ?
                                <ParticlesBg type="custom" config={config} bg={false} />
                                : <></>
                        }
                    </View>
                </ImageBackground>
                <View
                    style={{ position: 'absolute', right: 0, height: Dimensions.get('window').height, top: 0, justifyContent: 'space-around', width: Dimensions.get('window').width / 1.775, alignItems: 'center' }}
                >
                    <View></View>
                    <View>
                        <Animated.Text style={{
                            opacity: fadeTextHappy,
                            color: '#FFF',
                            fontFamily: 'Poppins-Bold',
                            textShadowColor: 'rgba(255, 255, 255, 0.55)',
                            textShadowOffset: { width: 0, height: 0 },
                            textShadowRadius: 20,
                            textAlign: 'center',
                            fontSize: 23
                        }}>Happy Birthday</Animated.Text>
                        <Animated.Text style={{
                            opacity: fadeTextFarah,
                            color: '#FFF',
                            fontFamily: 'Poppins-Bold',
                            textShadowColor: 'rgba(255, 255, 255, 0.55)',
                            textShadowOffset: { width: 0, height: 0 },
                            textShadowRadius: 20,
                            textAlign: 'center',
                            fontSize: 35,
                            marginTop: 2
                        }}>Farah Dwi Atika</Animated.Text>
                    </View>


                    <TouchableOpacity
                        onPress={() => {
                            if (enableButtonWishes) {
                                whoosh.stop()
                                navigation.navigate('WishScreen')
                            }
                        }}

                        style={{
                            backgroundColor: bgButtonBuatHarapan,
                            borderRadius: 10,
                            paddingHorizontal: 40,
                            paddingVertical: 17,
                            shadowColor: 'rgba(255,255,255, 1)',
                            shadowOffset: { width: 0, height: 0 },
                            elevation: 16,
                            shadowOpacity: 1
                        }}
                    >
                        <Text
                            style={{
                                color: '#FAFAFA',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 18
                            }}
                        >Buat Harapan</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{ position: 'absolute' }}
            >
                <FastImage
                    source={require('./../assets/images/ultah.png')}
                    style={{
                        width: Dimensions.get('window').height + 50,
                        height: Dimensions.get('window').height + 50,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />

                <FastImage

                    style={{
                        position: 'absolute',
                        top: (Dimensions.get('window').height + 50) / 4.37,
                        left: (Dimensions.get('window').height + 50) / 2.34,
                        width: 60,
                        height: 60,
                        display: displayCandle1
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    source={require('./../assets/gif/flame.gif')}
                />

                <FastImage
                    style={{
                        position: 'absolute',
                        top: (Dimensions.get('window').height + 50) / 4.37,
                        left: (Dimensions.get('window').height + 50) / 2.13,
                        width: 60,
                        height: 60,
                        display: displayCandle2
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    source={require('./../assets/gif/flame.gif')}
                />

            </View>


            <Draggable
                imageSource={require('./../assets/images/wooden_match.png')}
                isCircle={false}
                x={Dimensions.get('window').width - 200}
                y={50}
                onDrag={(event, gestureState) => {
                    if (
                        gestureState.moveY - 30 > (((Dimensions.get('window').height + 50) / 4.37) - 20) &&
                        gestureState.moveY - 30 < ((Dimensions.get('window').height + 50) / 4.37) + 20 &&
                        gestureState.moveX - 152 > (Dimensions.get('window').height + 50) / 2.34 &&
                        gestureState.moveX - 152 < ((Dimensions.get('window').height + 50) / 2.34) + 10) {
                        setDisplayCandle1('flex')
                    }

                    if (
                        gestureState.moveY - 30 > (((Dimensions.get('window').height + 50) / 4.37) - 20) &&
                        gestureState.moveY - 30 < ((Dimensions.get('window').height + 50) / 4.37) + 20 &&
                        gestureState.moveX - 152 > (Dimensions.get('window').height + 50) / 2.13 &&
                        gestureState.moveX - 152 < ((Dimensions.get('window').height + 50) / 2.13) + 20) {
                        setDisplayCandle2('flex')
                    }
                }}
            />

        </View>
    )
}