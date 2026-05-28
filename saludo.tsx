import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function saludo() {
  return (
    <View>
      <Text>HOLA DESDE OTRA PANTALLA</Text>
    <View></View>
      <Link href="/">
        Ir a index.
      </Link>
      <Link href="/perfil">
        Ir a perfil.
      </Link>
    </View>
  );
}