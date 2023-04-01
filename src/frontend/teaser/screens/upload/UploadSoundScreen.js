import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SongCard from "../../components/cards/SongCard";
const SONGS_DATA = [
  {
    id: "xjaojfdojosjfsf",
    title: "AmongUS SUS Noises",
    url: "",
    author: "Among US",
    thumbnail:
      "https://p1.hiclipart.com/preview/606/394/359/mac-os-x-mavericks-icons-itunes-red-and-white-music-logo-file-type-icon.jpg",
  },
  {
    id: "xylophoneharmonica",
    title: "Pop Song",
    url: "",
    author: "Yeezy",
    thumbnail:
      "https://p1.hiclipart.com/preview/606/394/359/mac-os-x-mavericks-icons-itunes-red-and-white-music-logo-file-type-icon.jpg",
  },
  {
    id: "aosfdjoasjfdo39z",
    title: "Boulevard of Broken Dreams",
    url: "",
    author: "Green Day",
    thumbnail:
      "https://p1.hiclipart.com/preview/606/394/359/mac-os-x-mavericks-icons-itunes-red-and-white-music-logo-file-type-icon.jpg",
  },
  {
    id: "sdfsdfbxe33232",
    title: "Undertale Theme #42",
    url: "",
    author: "Sans Undertale",
    thumbnail:
      "https://p1.hiclipart.com/preview/606/394/359/mac-os-x-mavericks-icons-itunes-red-and-white-music-logo-file-type-icon.jpg",
  },
  {
    id: "sfds53vhnzx2",
    title: "Skatsune Miku vs The World",
    url: "",
    author: "Skatsune Miku",
    thumbnail:
      "https://p1.hiclipart.com/preview/606/394/359/mac-os-x-mavericks-icons-itunes-red-and-white-music-logo-file-type-icon.jpg",
  },
];

export default function UploadSoundScreen({ navigation }) {
  const renderSongCard = ({ item }) => (
    <SongCard item={item} navigation={navigation} />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={SONGS_DATA}
        renderItem={renderSongCard}
        keyExtractor={(item) => item.id}
      />
      <FlatList />
    </SafeAreaView>
  );
}
