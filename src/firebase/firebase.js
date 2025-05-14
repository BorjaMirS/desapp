 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBpeHdxax96UpBs63mldJ1UQEQ7hh1IgCA",
   authDomain: "despesap-curs-borja.firebaseapp.com",
   projectId: "despesap-curs-borja",
   storageBucket: "despesap-curs-borja.firebasestorage.app",
   messagingSenderId: "369802044853",
   appId: "1:369802044853:web:93bd6d4b8b677ecb5c25fc"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app)

export const saveDespesa = async (despesa) => {
    console.log(despesa);
    const docRef = await addDoc(collection(db, "despeses"), despesa);

    return docRef.id;

 }

 export const getDespeses = () => 
  getDocs(collection(db, "despeses"));

 export const onGetDespeses = (callback) => 
  onSnapshot(collection(db, "despeses"), callback);

 export const deleteDespesa = async (id) =>  {
  try {
    await deleteDoc(doc(db, "despeses", id));
    console.log("Despesa eliminada amb ID: ", id);
  } catch (error) {
    console.error("Error eliminant despesa: ", error);
  }
 }
