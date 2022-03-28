import { FC, useEffect, useState } from "react";
import Task from "./pages/Todos";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./pages/Login";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, db, provider } from "./firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

const App: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();

  const [tasks, setTasks] = useState<DocumentData[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.uid == null) {
        setUser(null);
      } else {
        setUser(currentUser);
        const tasksCollectionRef = collection(
          db,
          "users",
          `${currentUser.uid}`,
          "todos"
        );

        onSnapshot(tasksCollectionRef, (snapshot) => {
          let tasks: any = [];
          snapshot.docs.forEach((doc) => {
            tasks.push({ ...doc.data(), id: doc.id });
          });
          setTasks(tasks);
        });
      }
    });
  }, []);

  const addTask = async (task: {
    title: string;
    desc: string;
    deadline: string;
  }) => {
    const newTask = {
      title: task.title,
      desc: task.desc,
      deadline: task.deadline,
    };
    const queryData = doc(collection(db, "users", `${user!.uid}`, "todos"));
    await setDoc(doc(db, `users/${user!.uid}`), {
      userId: user!.uid,
      userData: user!.providerData,
    });
    await setDoc(queryData, { ...newTask });
  };

  const deleteTask = async (id: any) => {
    await deleteDoc(doc(db, `users/${user!.uid}/todos`, id));
  };

  const Logout = async () => {
    await signOut(auth);
    setTasks([]);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const Register = async (userData: any) => {
    try {
      const CreateUser = await createUserWithEmailAndPassword(
        auth,
        userData.registerEmail,
        userData.registerPassword
      );
      navigate("/");
    } catch (error) {}
  };

  const Login = async (userData: any) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userData.loginEmail,
        userData.loginPassword
      );
      navigate("/");
    } catch (error) {}
  };
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthPage
              Login={Login}
              Register={Register}
              signInWithGoogle={signInWithGoogle}
            />
          }
        />
        <Route
          path="/"
          element={
            <Task
              tasks={tasks}
              user={user}
              addTask={addTask}
              deleteTask={deleteTask}
              Logout={Logout}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
