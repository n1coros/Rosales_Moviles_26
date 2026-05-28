import { Text, View } from 'react-native';
import { Link } from 'expo-router';


export default function Perfil() {
  return (
    <View>
      <Text>NOMBRE: Nicolas Rosales</Text>
      <Text>EDAD:
.
 18 años</Text>
      <Text>CURSO: 7mo 2da Programación</Text>
      <Link href="/">
        Ir a index.
    </Link>
    <Link href="/saludo">
        Ir a saludo.
    </Link>
    </View>
  );
}