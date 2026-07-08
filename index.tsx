import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [productos, setProductos] = useState([
    { id: '1', nombre: 'Camiseta', precio: '20' },
    { id: '2', nombre: 'Pantalón', precio: '35' },
    { id: '3', nombre: 'Zapatos', precio: '50' },
  ]);

  const [editando, setEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  const confirmarEliminacion = (id) => {
    Alert.alert(
      'Confirmar',
      '¿Deseas eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarProducto(id),
        },
      ]
    );
  };

  const editarProducto = (producto) => {
    setEditando(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  const guardarEdicion = () => {
    setProductos(
      productos.map((p) =>
        p.id === editando
          ? { ...p, nombre: nombre, precio: precio }
          : p
      )
    );

    setEditando(null);
    setNombre('');
    setPrecio('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Productos</Text>

      {editando && (
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder="Precio"
            keyboardType="numeric"
            value={precio}
            onChangeText={setPrecio}
          />

          <Button
            title="Guardar Cambios"
            onPress={guardarEdicion}
          />
        </View>
      )}

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Precio: ${item.precio}</Text>

            <View style={styles.botones}>
              <Button
                title="Editar"
                onPress={() => editarProducto(item)}
              />

              <Button
                title="Eliminar"
                color="red"
                onPress={() => confirmarEliminacion(item.id)}
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  formulario: {
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