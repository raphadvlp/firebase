import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; //Importa para ter a conexão com o banco

//Essa config pega no firebase
const firebaseConfig = {
    apiKey: "AIzaSyCgO1FEqgicPOCf2BjlvUpLyQBTMXPrC5w",
    authDomain: "curso-89fa6.firebaseapp.com",
    projectId: "curso-89fa6",
    storageBucket: "curso-89fa6.appspot.com",
    messagingSenderId: "886281518356",
    appId: "1:886281518356:web:deb8e79e43677260895601",
    measurementId: "G-ZMN36DSDSK"
  };

  const firebaseApp = initializeApp(firebaseConfig); //Inicializando o firebase

  const db = getFirestore(firebaseApp); //Inicializou o banco

  export { db };