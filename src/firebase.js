import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { ref, onUnmounted } from 'vue';

const config = {
  apiKey: "AIzaSyCzoLWEHjzOl7ORmqIa7ZHnhvNoz1bXhME",
  authDomain: "vue-3-crud-a901c.firebaseapp.com",
  projectId: "vue-3-crud-a901c",
  storageBucket: "vue-3-crud-a901c.firebasestorage.app",
  messagingSenderId: "724031868565",
  appId: "1:724031868565:web:2534c93f3ace3a8794959c"
};

const firebaseApp = initializeApp(config);

const db = getFirestore(firebaseApp);
const userCollection = collection(db, 'users');

export const createUser = async (user) => {
  return await addDoc(userCollection, user);
};

export const getUser = async (id) => {
  const userDoc = await getDoc(doc(userCollection, id));
  return userDoc.exists() ? userDoc.data() : null;
};

export const updateUser = async (id, user) => {
  return await updateDoc(doc(userCollection, id), user);
};

export const loadUsers = () => {
  const users = ref([]);
  const close = onSnapshot(userCollection, (snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return users;
};
