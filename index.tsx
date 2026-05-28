import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View>
      <Text>MI NOMBRE ES NICOLAS ROSALES</Text>
    <View></View>
      <Link href="/saludo">
        Ir a saludo.
      </Link>
      <Link href="/perfil">
        Ir a perfil.
      </Link>

    </View>
  );
}