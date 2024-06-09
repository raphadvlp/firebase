import { useState } from 'react';
import { db } from './firebaseConnection';
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore';

import './app.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  
  const [posts, setPosts] = useState('');

  async function handleAdd() {
    /* FORMA DE ACRESCENTAR NO BANCO ESTATICAMENTE, SETANDO O POSTS E O SEU ID
    await setDoc(doc(db, "posts", "12345"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("Dados registrador no banco!");
    })
    .catch((error) => {
      console.log("Gerou erro " + error);
    })
    */

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("CADSATRADOR COM SUCESSO!");
      setAutor('');
      setTitulo('');
    })
    .catch((error) => {
      console.log("ERROR " + error);
    })

  }

  //Buscando item único no banco
  async function buscarPost() {
    
    /* FORMA DE BUSCAR NO BANCO UM REGISTRO DINAMICAMENTE, SETANDO O POSTS E O SEU ID
    const postRef = doc(db, "posts", "4fKL9OQREG6f3iBOJRQw");

    await getDoc(postRef)
    .then((snapshot) => {
      setAutor(snapshot.data().autor)
      setTitulo(snapshot.data().titulo)
    })
    .catch((error) => {
      console.log("Erro ao buscar!");
    })
      */

    const postRef = collection(db, "posts")
    await getDocs(postRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })

      setPosts(lista);

    })
    .catch((error) => {
      console.log("Erro ao buscar os posts");
    })

  }

  return (
    <div className="App">
      <h1>ReactJS + Firebase :)</h1>
      <div className="container">
        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder='Digite o titulo'
          value={titulo}
          onChange={ (e) => setTitulo(e.target.value) }
        />

        <label>Autor:</label>
        <input 
          type="text" 
          placeholder='Autor do post'
          value={autor}
          onChange={ (e) => setAutor(e.target.value) }
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar Post</button>

        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <span>Titulo: {post.titulo} </span> <br />
                <span>Autor: {post.autor} </span> <br /> <br />
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  );
}

export default App;
