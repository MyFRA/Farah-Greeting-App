import KeepAwake from "@sayem314/react-native-keep-awake";
import { useEffect, useRef, useState } from "react";
import { Dimensions, ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import Sound from "react-native-sound";
import ParticlesBg from 'react-native-particles-bg';

var whoosh = new Sound('kimi_dattara.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
})

export default function WishScreen({ navigation }) {
    const textInputRef = useRef()

    const [wishesText, setWishesText] = useState('')
    useEffect(() => {
        whoosh.play()
    }, [])

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
        <View style={{ position: 'relative', flex: 1 }}>

            <StatusBar hidden={true} />
            <KeepAwake />

            <View
                style={{ width: 0, height: 0 }}
            >
                <TextInput
                    multiline={true}
                    style={{ width: 0, height: 0 }} onChangeText={(text) => {
                        setWishesText(text)
                    }} ref={textInputRef} />
            </View>

            <ImageBackground source={{ uri: 'https://static.vecteezy.com/system/resources/previews/017/188/338/original/japanese-background-illustration-happy-new-year-decoration-template-pastel-japanese-pattern-style-with-sakura-flower-mount-fuji-and-torii-gate-design-for-card-wallpaper-poster-banner-vector.jpg' }} style={{ flex: 1 }} resizeMode="cover">

                <View
                    style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center' }}
                >
                    <ParticlesBg type="custom" config={config} bg={false} />

                    <View
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, paddingHorizontal: 100, justifyContent: 'space-around', flex: 1 }}
                    >
                        <Text
                            style={{ fontSize: 25, textAlign: 'center', fontFamily: 'LibreBaskerville-Bold', paddingVertical: 13, color: 'white' }}
                        >Tulis Harapanmu</Text>

                        <View
                            style={{ backgroundColor: 'rgba(255,255,255, 0.8)', height: Dimensions.get('window').height / 2, borderRadius: 10, padding: 20 }}
                        >
                            <ScrollView
                                style={{ flex: 1 }}
                            >
                                <TouchableOpacity

                                    style={{ minHeight: (Dimensions.get('window').height / 2) - 40 }}
                                    onPress={() => {
                                        textInputRef.current.focus()
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 15, lineHeight: 25 }}
                                    >
                                        {wishesText}
                                    </Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        <TouchableOpacity
                            style={{ backgroundColor: 'rgb(249 115 22)', borderRadius: 8 }}
                            onPress={() => {
                                whoosh.stop()
                                navigation.navigate('AuthorScreen')
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15, textAlign: 'center', color: 'white', shadowColor: 'rgba(255,255,255, 1)',
                                    shadowOffset: { width: 0, height: 0 },
                                    elevation: 16,
                                    shadowOpacity: 1, fontFamily: 'LibreBaskerville-Bold', paddingVertical: 13
                                }}
                            >Simpan Harapan & Lanjutkan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}