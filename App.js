import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';

export default function App() {

  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Análisis');
  const [tareas, setTareas] = useState([]);

  const total = tareas.length;

  const pendientes = tareas.filter(
    tarea => tarea.estado === 'Pendiente'
  ).length;

  const completadas = tareas.filter(
    tarea => tarea.estado === 'Completada'
  ).length;

  const agregarTarea = () => {

    if (titulo.trim() === '') {
      Alert.alert(
        'Campo obligatorio',
        'Por favor, escribe el título de la tarea.'
      );
      return;
    }

    const nuevaTarea = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      categoria: categoria,
      estado: 'Pendiente'
    };

    setTareas([...tareas, nuevaTarea]);

    setTitulo('');
  };

  const cambiarEstado = (id) => {

    const nuevasTareas = tareas.map(tarea => {

      if (tarea.id === id) {

        return {
          ...tarea,
          estado: tarea.estado === 'Pendiente'
            ? 'Completada'
            : 'Pendiente'
        };

      }

      return tarea;

    });

    setTareas(nuevasTareas);
  };

  const eliminarTarea = (id) => {

    setTareas(tareasActuales =>
      tareasActuales.filter(tarea => tarea.id !== id)
    );

  };

  const renderizarTarea = ({ item }) => {

    const estaCompletada = item.estado === 'Completada';

    return (

      <View style={styles.tarjeta}>

        <View style={styles.filaSuperior}>

          <Text style={styles.categoriaTexto}>
            {item.categoria}
          </Text>

          <Text
            style={[
              styles.estado,
              estaCompletada
                ? styles.estadoCompletado
                : styles.estadoPendiente
            ]}
          >
            {item.estado}
          </Text>

        </View>

        <Text
          style={[
            styles.tituloTarea,
            estaCompletada && styles.textoTachado
          ]}
        >
          {item.titulo}
        </Text>

        <View style={styles.botonesTarea}>

          <Pressable
            style={styles.botonCompletar}
            onPress={() => cambiarEstado(item.id)}
          >
            <Text style={styles.textoBoton}>
              {estaCompletada ? '↩ Pendiente' : '✓ Completar'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.botonEliminar}
            onPress={() => eliminarTarea(item.id)}
          >
            <Text style={styles.textoBoton}>
              Eliminar
            </Text>
          </Pressable>

        </View>

      </View>

    );

  };

  return (

    <SafeAreaView style={styles.contenedor}>

      <StatusBar barStyle="light-content" backgroundColor="#101827" />

      <FlatList

        data={tareas}

        keyExtractor={(item) => item.id}

        renderItem={renderizarTarea}

        showsVerticalScrollIndicator={false}

        keyboardShouldPersistTaps="handled"

        contentContainerStyle={styles.listaContenido}

        ListHeaderComponent={

          <View>


            <View style={styles.encabezado}>

              <Text style={styles.etiqueta}>
                SENA · ADSO
              </Text>

              <Text style={styles.tituloApp}>
                Mi Sprint ADSO
              </Text>

              <Text style={styles.subtitulo}>
                Organiza tus tareas y controla tu progreso.
              </Text>

              <View style={styles.perfil}>
                <Text style={styles.nombre}>
                  Aprendiz: Juan Fuentes
                </Text>

                <Text style={styles.ficha}>
                  Ficha 3409609
                </Text>
              </View>

            </View>


            <Text style={styles.tituloSeccion}>
              Resumen de avance
            </Text>

            <View style={styles.resumen}>

              <View style={styles.tarjetaResumen}>
                <Text style={styles.numero}>
                  {total}
                </Text>
                <Text style={styles.textoResumen}>
                  Total
                </Text>
              </View>

              <View style={styles.tarjetaResumen}>
                <Text style={[styles.numero, { color: '#F5B942' }]}>
                  {pendientes}
                </Text>
                <Text style={styles.textoResumen}>
                  Pendientes
                </Text>
              </View>

              <View style={styles.tarjetaResumen}>
                <Text style={[styles.numero, { color: '#38D996' }]}>
                  {completadas}
                </Text>
                <Text style={styles.textoResumen}>
                  Completadas
                </Text>
              </View>

            </View>


            <Text style={styles.tituloSeccion}>
              Nueva tarea
            </Text>

            <View style={styles.formulario}>

              <Text style={styles.etiquetaCampo}>
                Título de la tarea
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ej: Diseñar la interfaz"
                placeholderTextColor="#8792A5"
                value={titulo}
                onChangeText={setTitulo}
              />

              <Text style={styles.etiquetaCampo}>
                Categoría
              </Text>

              <View style={styles.categorias}>

                {['Análisis', 'Diseño', 'Código'].map(
                  (opcion) => (

                    <Pressable
                      key={opcion}
                      style={[
                        styles.botonCategoria,
                        categoria === opcion &&
                          styles.categoriaSeleccionada
                      ]}
                      onPress={() => setCategoria(opcion)}
                    >
                      <Text
                        style={[
                          styles.textoCategoria,
                          categoria === opcion &&
                            styles.textoCategoriaSeleccionada
                        ]}
                      >
                        {opcion}
                      </Text>
                    </Pressable>

                  )
                )}

              </View>

              <Pressable
                style={styles.botonAgregar}
                onPress={agregarTarea}
              >
                <Text style={styles.textoAgregar}>
                  Agregar tarea
                </Text>
              </Pressable>

            </View>


            <Text style={styles.tituloSeccion}>
              Mis tareas
            </Text>

          </View>

        }

        ListEmptyComponent={

          <View style={styles.vacio}>
            <Text style={styles.textoVacio}>
              Todavía no tienes tareas.
            </Text>
            <Text style={styles.subtextoVacio}>
              Agrega tu primera tarea para comenzar.
            </Text>
          </View>

        }

        ListFooterComponent={
          <Text style={styles.pie}>
            Mi Sprint ADSO · SENA 2026
          </Text>
        }

      />

    </SafeAreaView>

  );

}


const styles = StyleSheet.create({

  contenedor: {
    flex: 1,
    backgroundColor: '#101827'
  },

  listaContenido: {
    padding: 20,
    paddingBottom: 35
  },

  encabezado: {
    marginBottom: 25,
    marginTop: 15
  },

  etiqueta: {
    color: '#38D996',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2
  },

  tituloApp: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 8,
  },

  subtitulo: {
    color: '#AAB4C5',
    fontSize: 14,
    marginTop: 7
  },

  perfil: {
    backgroundColor: '#1B283A',
    padding: 14,
    borderRadius: 12,
    marginTop: 20
  },

  nombre: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14
  },

  ficha: {
    color: '#38D996',
    fontSize: 12,
    marginTop: 5
  },

  tituloSeccion: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10
  },

  resumen: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25
  },

  tarjetaResumen: {
    flex: 1,
    backgroundColor: '#1B283A',
    paddingVertical: 17,
    borderRadius: 12,
    alignItems: 'center'
  },

  numero: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold'
  },

  textoResumen: {
    color: '#AAB4C5',
    fontSize: 11,
    marginTop: 5
  },

  formulario: {
    backgroundColor: '#1B283A',
    padding: 17,
    borderRadius: 14,
    marginBottom: 25
  },

  etiquetaCampo: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 9
  },

  input: {
    backgroundColor: '#101827',
    color: '#FFFFFF',
    borderRadius: 9,
    padding: 13,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#344258'
  },

  categorias: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20
  },

  botonCategoria: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 8,
    backgroundColor: '#101827',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#344258'
  },

  categoriaSeleccionada: {
    backgroundColor: '#174E43',
    borderColor: '#38D996'
  },

  textoCategoria: {
    color: '#AAB4C5',
    fontSize: 12
  },

  textoCategoriaSeleccionada: {
    color: '#38D996',
    fontWeight: 'bold'
  },

  botonAgregar: {
    backgroundColor: '#38D996',
    padding: 14,
    borderRadius: 9,
    alignItems: 'center'
  },

  textoAgregar: {
    color: '#101827',
    fontWeight: 'bold',
    fontSize: 15
  },

  tarjeta: {
    backgroundColor: '#1B283A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#29394F'
  },

  filaSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  categoriaTexto: {
    color: '#38D996',
    fontSize: 12,
    fontWeight: 'bold'
  },

  estado: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },

  estadoPendiente: {
    backgroundColor: '#493A1F',
    color: '#F5B942'
  },

  estadoCompletado: {
    backgroundColor: '#174E43',
    color: '#38D996'
  },

  tituloTarea: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 13,
    marginBottom: 15
  },

  textoTachado: {
    textDecorationLine: 'line-through',
    color: '#8792A5'
  },

  botonesTarea: {
    flexDirection: 'row',
    gap: 10
  },

  botonCompletar: {
    flex: 1,
    backgroundColor: '#245B4D',
    padding: 11,
    borderRadius: 8,
    alignItems: 'center'
  },

  botonEliminar: {
    backgroundColor: '#642F38',
    padding: 11,
    borderRadius: 8,
    alignItems: 'center'
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold'
  },

  vacio: {
    backgroundColor: '#1B283A',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center'
  },

  iconoVacio: {
    fontSize: 30,
    marginBottom: 10
  },

  textoVacio: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15
  },

  subtextoVacio: {
    color: '#AAB4C5',
    fontSize: 12,
    marginTop: 7,
    textAlign: 'center'
  },

  pie: {
    color: '#64748B',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 25
  }

});
