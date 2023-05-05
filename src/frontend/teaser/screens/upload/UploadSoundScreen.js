import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import SongCard from "../../components/cards/SongCard";
import SongForYouHeader from "../../components/navs/header/SongForYouHeader";
import SongInput from "../../components/elements/input/SongInput";
import SongTagCard from "../../components/cards/SongTagCard";
import { writeOnlyEditorSoundAtomAtom } from "../../hooks/upload/useSound";
import { useSetAtom } from "jotai";
// import Carousel from 'react-native-reanimated-carousel';

const SONGS_DATA = [
  {
    id: "1",
    title: "AmongUS SUS Noises",
    sound: {
      url: "https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/sus15.opus",
      duration: 15000,
    },
    author: "Among US",
    thumbnail:
      "https://p1.hiclipart.com/preview/606/394/359/mac-os-x-mavericks-icons-itunes-red-and-white-music-logo-file-type-icon.jpg",
  },
  {
    id: "xylophoneharmonica",
    title: "Pop Song",
    sound: {
      url: "https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/sus15.opus",
      duration: 15000,
    },
    author: "Yeezy",
    thumbnail:
      "https://p1.hiclipart.com/preview/606/394/359/mac-os-x-mavericks-icons-itunes-red-and-white-music-logo-file-type-icon.jpg",
  },
  {
    id: "aosfdjoasjfdo39z",
    title: "Boulevard of Broken Dreams",
    sound: {
      url: "https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/sus15.opus",
      duration: 15000,
    },
    author: "Green Day",
    thumbnail:
      "https://p1.hiclipart.com/preview/606/394/359/mac-os-x-mavericks-icons-itunes-red-and-white-music-logo-file-type-icon.jpg",
  },
  {
    id: "sdfsdfbxe33232",
    title: "Undertale Theme #42",
    sound: {
      url: "https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/sus15.opus",
      duration: 15000,
    },
    author: "Sans Undertale",
    thumbnail:
      "https://p1.hiclipart.com/preview/606/394/359/mac-os-x-mavericks-icons-itunes-red-and-white-music-logo-file-type-icon.jpg",
  },
  {
    id: "sfds53vhnzx2",
    title: "Skatsune Miku vs The World",
    sound: {
      url: "https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/sus15.opus",
      duration: 15000,
    },
    author: "Skatsune Miku",
    thumbnail:
      "https://p1.hiclipart.com/preview/606/394/359/mac-os-x-mavericks-icons-itunes-red-and-white-music-logo-file-type-icon.jpg",
  },
];

const SONG_TAGS_DATA = [
  {
    id: "xzfjvooio3fsjvoljd",
    name: "Viral",
    iconUri:
      "https://is3-ssl.mzstatic.com/image/thumb/Purple124/v4/c9/d3/9c/c9d39c49-9777-20c9-cc4e-3eca636b8dec/source/256x256bb.jpg",
    backgroundColour: "#db133e",
  },
  {
    id: "fsdfsdfs3fszx",
    name: "Charting",
    iconUri:
      "https://na.cdn.beatsaver.com/78bef7e360028761c93fba3b0f5517889f8a0b38.jpg",
    backgroundColour: "#76389b",
  },
  {
    id: "0234839481djk",
    name: "Asian Pop",
    iconUri:
      "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=425,format=auto/sites/default/files/styles/768x768/public/d8/images/canvas/2021/07/08/62d30fc0-81a2-4093-b5aa-182a94855233_386389bf.jpg",
    backgroundColour: "#c05801",
  },
  {
    id: "2323jdfoasdfjs3",
    name: "Indie",
    iconUri: "https://f4.bcbits.com/img/a0043392846_10.jpg",
    backgroundColour: "#203264",
  },
  {
    id: "lsdf3pj0fdjozjf",
    name: "Dance / Electronic",
    iconUri:
      "https://external-preview.redd.it/ET39RV2MkuHkPXhY-ArHY-qmbta7td4wtI7BbFuh5tg.jpg?auto=webp&s=dc37c80803cc49bc979a3d9a8eceab374205c900",
    backgroundColour: "#158807",
  },
  {
    id: "3smfjlzjkoxcjzx",
    name: "Rock",
    iconUri:
      "https://c-cl.cdn.smule.com/rs-s55/arr/3e/91/e2550023-85e3-4c70-84f3-2ee7fc9e6364.jpg",
    backgroundColour: "#273da2",
  },
  {
    id: "xzfjvooixcxxxvoljd",
    name: "Mood",
    iconUri:
      "https://styles.redditsound.com/t5_2i035a/styles/communityIcon_a14mtjrrbnv81.png?width=256&s=402b7cf00a2db0aecb78016b86298597d0b99230",
    backgroundColour: "#7358ff",
  },
  {
    id: "xzfjvooio3fsjdfsdssd",
    name: "Memes",
    iconUri:
      "https://i1.sndcdn.com/avatars-xqxbrcGokMOxLOv3-BYySpw-t500x500.jpg",
    backgroundColour: "#b02695",
  },
  {
    id: "xzfjvoxxxzzzsjvoljd",
    name: "Discover",
    iconUri:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFAAUAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAQIEBgcABf/EADEQAAEDAgQDBgQHAAAAAAAAAAEAAgMEEQUSITEGQWETIjJRcYFSocHwBxQjQmJykf/EABgBAQADAQAAAAAAAAAAAAAAAAABAwQC/8QAHBEBAQACAgMAAAAAAAAAAAAAAAECEQMhEjFB/9oADAMBAAIRAxEAPwDJTzQ0Vut+t0MbrQ7cNNVJ3efSyByRWuILSEIvHD1K2Gmc4Hvkn5C336rQsLlYyBjPhFh6LK8IxW8cUThqCNVYcbrqxlC00rzGP3OG6y543bTLPFeqvEaOK4mqYmf2eAqFxlV4VW07+xqonSDax3VLnFdM7t2skmbmsXkF+vVSJTX0rYo6iCJpkZmsGWc3oeq7nHrtx5/Hhy+IFM5o9a0skF9zqo6vU0S9j6IZ0Kc/xJpQPdpZFjGYIRNwOilQCxBA3QerhVC44hTWNmvIJWw1OCwyUTYy0EFiyDCKhxxGmiHxhbtD3qKM/wAVm5fa7H0oL+FXUkhfROAF9W3soGKUPZMc6ZjRIet/mr1+Za6SRrmlrmGxBVL4ynAYQ13efoFzLbVnxm+JuDqklvh2HooiPWG8zumiAdlqjNTn8imJ7wcoTBupQVS6R21+SiBEhNihHuYbVspcQhmdbK2QE9Vrg4rw+Kjj7NzppX2DIYhdxJWKsyuaC8OIPkrTw1XTUZvhuHE1DhlM0o7ob77eyp5Md9rsO+l+xOR0cLqqQBj3jM5t9uizXHqx00jnPPt0Xq4li+J1ZdJVy07Wt0McQOvuqbiNUZpCBoFzx4Jzy1NIEjszy7zKafquK5aFB0h5dUNO3dskcLIOCczdNalagm0VUITlkF2HQ6XsrHTVsTowBWMazlZw0VQzJMwXNx26xyuKx4tiVMyLsqV2c8ze6r2bMSUzNdOA0KmTSLdkXFIuO6lAhLWjQ3QzqbqTJR1LG5nQSBvnlNkACx1Qdaw1Shl2oscfbyNjbYA7k7BX/DuDqerijiiucou+Unx310Hkot0M7LEhbbktYm/D2mA/TkN72ty33XlVfAUrHOEZYLWFibXUecGeAgbgf4n5gRsPZWCr4WrIybRutvcAn6LyKigqKZueWMht7agqdwQimlHkgkYA4sNj0UrBaRtViMdO6F0r5HBrGbC/mUt0af/Z",
    backgroundColour: "#ff4534",
  },
  {
    id: "aaaaaaaaaaa34e32x",
    name: "Other",
    iconUri: "https://up.quizlet.com/uem2r-VP6PU-256s.jpg",
    backgroundColour: "#026350",
  },
];

export default function UploadSoundScreen({ navigation }) {
  const setEditorSound = useSetAtom(writeOnlyEditorSoundAtomAtom);
  const renderSongCard = ({ item }) => (
    <SongCard
      item={item}
      navigation={navigation}
      setEditorSound={setEditorSound}
    />
  );

  const renderSongForYouHeader = () => (
    <SongForYouHeader
      // TODO: Other props
      navigation={navigation}
    ></SongForYouHeader>
  );

  const renderSongTagCard = ({ item }) => <SongTagCard item={item} />;

  const renderForYouSongs = () => (
    <FlatList
      data={SONGS_DATA}
      renderItem={renderSongCard}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderSongForYouHeader}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <SongInput></SongInput>
      <View style={styles.flatlistOffset}>
        <FlatList
          data={SONG_TAGS_DATA}
          renderItem={renderSongTagCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListHeaderComponent={renderForYouSongs}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 48,
  },
  flatlistOffset: {
    marginHorizontal: 8,
  },
});
