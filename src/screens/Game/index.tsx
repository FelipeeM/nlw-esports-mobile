import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import { Background } from '../../components/Background';
import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';
import { THEME } from '../../theme';
import { GameParams } from '../../@types/@navegation';
import { View, TouchableOpacity, Image, FlatList } from 'react-native'
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {

  const [duos, setDuo] = useState<DuoCardProps[]>([])
  const navigation = useNavigation()

  const route = useRoute();
  const game = route.params as GameParams;


  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://192.168.0.13:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => { setDuo(data) })
  }, []);


  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              onPress={handleGoBack} />

          </TouchableOpacity>
          <Image
            source={logoImg}
            style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />
        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item} />
          )}
        />


      </SafeAreaView>
    </Background>
  );
}