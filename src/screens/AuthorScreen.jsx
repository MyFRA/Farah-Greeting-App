import { useIsFocused } from "@react-navigation/native";
import KeepAwake from "@sayem314/react-native-keep-awake";
import { useEffect, useRef, useState } from "react";
import { BackHandler, Dimensions, ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import Sound from "react-native-sound";
import TypeWriter from 'react-native-typewriter'

var whoosh = new Sound('wishing.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
})

export default function AuthorScreen({ navigation }) {

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
                whoosh.pause()
                navigation.navigate('WishScreen')

                return () => { };
            })

            return () => backHandler.remove()
        } else {
            return () => { }
        }
    }, [isFocused])

    useEffect(() => {
        whoosh.play()
    }, [])

    const textInputRef = useRef()

    const [wishesText, setWishesText] = useState('')

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

            <ImageBackground source={require('./../assets/images/author_screen_bg.jpg')} style={{ flex: 1 }} resizeMode="cover">
                <View
                    style={{ paddingHorizontal: 100, justifyContent: 'space-around', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    <Text
                        style={{ fontSize: 25, textAlign: 'center', fontFamily: 'Poppins-Bold', paddingVertical: 13, color: 'white' }}
                    >Penutup | Harapan Author</Text>

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
                                <TypeWriter typing={1}>
                                    Iya, Halo Farah...{"\n"}
                                    {"\n"}
                                    Yang pertama, semoga kabar dirimu baik dan sehat selalu.{"\n"}
                                    {"\n"}
                                    Lalu selanjutnya, hari ini yah, tepat 21 September 2023 adalah hari ulang tahun mu.{"\n"}
                                    Jadi, Selamat Ulang Tahun dan kebetulan juga, pas banget dirimu hari ini mungkin sudah sampai di Jepang, jadi selamat juga uisan sampai di Jepang.{"\n"}
                                    {"\n"}
                                    Selanjutnya, yah walaupun tidak diminta, pengin aku mengatakan satu patah dua patah kata untuk dirimu...{"\n"}
                                    {"\n"}
                                    Pertama, berkaitan dengan ulang tahun. Selamat Ulang Tahun, semoga dirimu panjang umur, sehat selalu, dimudahkan rezeki nya, dimudahkan urusannya dan yah intinya sing apik2 nggo dirimu.{"\n"}
                                    Kedua, wah mantap uisan di Jepang. Boleh lah yah, kapan-kapan ngobrol tentang Jepang.{"\n"}
                                    {"\n"}
                                    Tapi tanggal 21 September, kayak spesial loh menurutku.{"\n"}
                                    Pertama, kui sudah pasti ulang tahun mu. {"\n"}
                                    Kedua, kebetulan juga dirimu tiba di Jepang, di tanggal 21 September. Pas banget, dadi kayak kebetulan banget menurutku.{"\n"}
                                    Ketiga, entah kenapa kebetulan juga ada orang yang ulang tahun nya juga sama denganmu, hehe. {"\n"}
                                    {"\n"}
                                    {"\n"}
                                    Yah akhir kata, Aku tetap komitmen dengan apa yang tertulis di surat kemarin.{"\n"}
                                    {"\n"}
                                    Song:{"\n"}
                                    1. Katawaredoki - Radwimps{"\n"}
                                    2. Always With Me (Itsumo Nando Demo) - Spirited Away{"\n"}
                                    3. Kimi Dattara - Happy Birthday{"\n"}
                                    4. Wishing - Rem (Inori Minase){"\n"}
                                    5. Sore wa Chiisana Hikari no Youna - Sayuri{"\n"}
                                </TypeWriter>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: 'rgb(219 39 119)',
                            shadowColor: 'rgba(255,255,255, 1)',
                            shadowOffset: { width: 0, height: 0 },
                            elevation: 16,
                            shadowOpacity: 1,
                            borderRadius: 8
                        }}
                        onPress={() => {
                            whoosh.pause()
                            navigation.navigate('MainScreen')
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15, textAlign: 'center', color: 'white', shadowColor: 'rgba(255,255,255, 1)',
                                shadowOffset: { width: 0, height: 0 },
                                elevation: 16,
                                shadowOpacity: 1, fontFamily: 'Poppins-Bold', paddingVertical: 13
                            }}
                        >Menu Utama</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}