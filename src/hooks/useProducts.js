
/**
 * HOOK: useProducts
 *
 * RESPONSABILIDAD:
 * Obtener los productos desde Firestore y administrar
 * los estados de carga, productos y errores.
 *
 * No dibuja tarjetas ni filtra categorías.
 * Esa responsabilidad pertenece a CatalogPage.
 */

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebase";

export function useProducts() {

  // Guarda el array de productos obtenidos de Firestore.
  // Inicialmente está vacío porque todavía no consultamos la BD.
  const [products, setProducts] = useState([]);

  // Indica si estamos esperando la respuesta de Firestore.
  // Comienza en true porque la primera consulta está pendiente.
  const [loading, setLoading] = useState(true);

  // Guarda un mensaje si ocurre un error durante la consulta.
  // null significa que todavía no hay ningún error.
  const [error, setError] = useState(null);

  useEffect(() => {

    // Evita actualizar el estado si el componente se desmontó.
    let active = true;

    // Función asíncrona que consulta la base de datos.
    async function fetchProducts() {

      try {

        // collection() referencia la colección "items".
        // getDocs() consulta Firestore.
        // await espera a que termine la consulta.
        //
        // snapshot contiene los documentos devueltos,
        // pero todavía no es un array de productos comunes.
        const snapshot = await getDocs(
          collection(db, "items")
        );

        // snapshot.docs es un array de documentos de Firestore.
        //
        // map() recorre cada documento y crea un objeto nuevo.
        //
        // doc.data() obtiene sus campos: name, price, img, etc.
        // ... copia esos campos dentro del nuevo objeto.
        // doc.id agrega el identificador real de Firestore.
        const items = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Si el componente sigue montado,
        // guardamos los productos en el estado de React.
        //
        // setProducts provoca un nuevo renderizado.
        if (active) {
          setProducts(items);
        }

      } catch (err) {

        // Si falla la consulta, guardamos un mensaje de error.
        // console.error permite ver el error técnico en VS Code
        // o en la consola del navegador.
        if (active) {
          setError("No pudimos cargar los discos.");
          console.error(err);
        }

      } finally {

        // Se ejecuta tanto si la consulta salió bien
        // como si ocurrió un error.
        //
        // Al poner loading en false, indicamos que terminó.
        if (active) {
          setLoading(false);
        }
      }
    }

    // Ejecutamos la función que acabamos de declarar.
    fetchProducts();

    // Cleanup: se ejecuta cuando el componente se desmonta.
    // Evita actualizar estados de un componente desmontado.
    return () => {
      active = false;
    };

  }, []); // [] = efecto al montar; no depende de props ni estados.

  // Devolvemos los datos para que otros componentes
  // puedan utilizarlos mediante el hook.
  return {
    products,
    loading,
    error,
  };
}
