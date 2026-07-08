import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');

  const guardarProducto = () => {
    if (
      nombre.trim() === '' ||
      descripcion.trim() === '' ||
      precio.trim() === '' ||
      categoria.trim() === ''
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (isNaN(precio) || Number(precio) <= 0) {
      Alert.alert('Error', 'Ingrese un precio válido');
      return;
    }

    Alert.alert(
      'Producto creado',
      `Nombre: ${nombre}
Descripción: ${descripcion}
Precio: $${precio}
Categoría: ${categoria}`
    );

    // Limpiar formulario
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCategoria('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Crear Producto</Text>

      <Text>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text>Descripción</Text>
      <TextInput
        style={[styles.input, styles.descripcion]}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <Text>Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Button
        title="Guardar Producto"
        onPress={guardarProducto}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  descripcion: {
    height: 80,
    textAlignVertical: 'top',
  },
});