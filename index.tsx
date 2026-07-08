import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const datos = await AsyncStorage.getItem('productos');
    if (datos) {
      setProductos(JSON.parse(datos));
    }
  };

  const guardarProductos = async (lista) => {
    setProductos(lista);
    await AsyncStorage.setItem('productos', JSON.stringify(lista));
  };

  const guardar = () => {
    if (nombre === '' || precio === '') {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    if (editando) {
      const lista = productos.map((p) =>
        p.id === editando
          ? { ...p, nombre, precio }
          : p
      );

      guardarProductos(lista);
      setEditando(null);

    } else {
      const nuevo = {
        id: Date.now().toString(),
        nombre,
        precio,
      };

      guardarProductos([...productos, nuevo]);
    }

    setNombre('');
    setPrecio('');
  };

  const editar = (producto) => {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setEditando(producto.id);
  };

  const eliminar = (id) => {
    Alert.alert(
      'Confirmar',
      '¿Eliminar producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const lista = productos.filter(
              (p) => p.id !== id
            );

            guardarProductos(lista);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        CRUD Productos
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <Button
        title={editando ? 'Actualizar' : 'Agregar'}
        onPress={guardar}
      />

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text>
              Nombre: {item.nombre}
            </Text>

            <Text>
              Precio: ${item.precio}
            </Text>

            <View style={styles.botones}>
              <Button
                title="Editar"
                onPress={() => editar(item)}
              />

              <Button
                title="Eliminar"
                color="red"
                onPress={() => eliminar(item.id)}
              />
            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },

  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

});