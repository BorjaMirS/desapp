 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

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

  //Autenticació
  const auth = getAuth(app); 
  
export const saveDespesa = async (despesa) => {
    console.log(despesa);
    const docRef = await addDoc(collection(db, "despeses"), despesa);

    return docRef.id;

 }

 export const updateParticipants = async (idProjecte, participants) => {
      try {
      await updateDoc(doc(db, "projectes", idProjecte), {
        participants: participants
      });
      console.log("Participants actualitzats");
    } catch (error) {
      console.error("Error actualitzant participants: ", error);
    }
 }

 export const saveCollection = async (collectionName, item) => {
  console.log(item);
  const docRef = await addDoc(collection(db, collectionName), item);
  console.log("Collection amb id: ", docRef.id);
  return docRef.id;

}


 export const getDespeses = () => 
  getDocs(collection(db, "despeses"));

 export const onGetCollection = (collectionName, callback) => 
  onSnapshot(collection(db, collectionName), callback);

 export const deleteDespesa = async (id) =>  {
  try {
    await deleteDoc(doc(db, "despeses", id));
    console.log("Despesa eliminada amb ID: ", id);
  } catch (error) {
    console.error("Error eliminant despesa: ", error);
  }
 }

 export const deleteDocument = async (document, id) => {
   try {
    await deleteDoc(doc(db, document, id));
    console.log(`Document eliminat ${document} eliminada amb ID: ${id}`);
  } catch (error) {
    console.error("Error eliminant document: ", error);
  } 
 }

 export const OnGetDocument = (id, collectionName, callback) => 
    onSnapshot(doc(db, collectionName, id), callback);

 export const OnGetDespesa = (id, callback) => 
  onSnapshot(doc(db, "despeses", id), callback);

//Auth function
export const registerUser = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
      console.log(error.code);
      console.log(error.message);
  }
} 

export const loginUser = async (email, password) => {
  try {
    console.log("Auth: ", auth);
    console.log("Email: ", email);
    console.log("Contrasenya: ", password);
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Error login: ", error.code);
  }
}
export const logoutUser = async () => {
   await signOut(auth);
}
 
//Crear mètode per comprovar si tenim usuari logejat: onAuthStateChanged
export const isUserLoggedIn =  (user) => 
   onAuthStateChanged(auth, user);

