import React, { ChangeEvent, FC, useState, useEffect } from "react";
import Note from "../components/Note";

import { auth, db } from "../firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  where,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { idText } from "typescript";
const { v4: uuidv4 } = require("uuid");

const Task: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [task, setTask] = useState<DocumentData[]>([]);

  const [user, setUser] = useState<any>("unknown");

  console.log(task);
  console.log(user);

  // const data = await getDocs(q);
  // setTask(
  //   data.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id }))
  // );

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.uid == null) {
        setUser("Unknown");
      } else {
        setUser(currentUser.uid)
        const tasksCollectionRef = collection(
          db,
          "users",
          `${currentUser.uid}`,
          "todos"
        );
        // const q = query(tasksCollectionRef, where("userId", "==", currentUser.uid));
        onSnapshot(tasksCollectionRef, (snapshot) => {
          let tasks: any = [];
          snapshot.docs.forEach((doc) => {
            tasks.push({ ...doc.data(), id: doc.id });
          });
          setTask(tasks);
        });
        // const getTask = async () => {

        // })
        // }
        //   getTask()
      }
    });
  }, []);
  const getData = async () => {
    const q = query(collection(db,
      "users",
      `${user}`,
      "todos"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
      email: detail,
    }));
  };
  const remainingTask = task.length;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    // forgot to put as a string
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "desc") {
      setDesc(event.target.value);
    } else if (event.target.name === "deadline") {
      setDeadline(event.target.value);
    }
  };

  const addTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newTask = {
      title: title,
      desc: desc,
      deadline: deadline,
    };
    if (title === "") {
      alert("Please add a task");
      return;
    }
    // didnt put empty string
    // setTask([...task, newTask]);
    //Reset form on submit

    //   setTask(queryData);
    //   queryData.map(async (v) => {
    //     await setDoc(doc(db, `users/${v.id}/more-details`, task.title), {
    //         name: task.title,

    //     });
    // };
    // await addDoc(tasksCollectionRef, newTask);
    console.log(user)
    const queryData = doc(collection(db, "users",
    `${user}`,
    "todos"));
    await setDoc(doc(db,`users/${user}`),{
      userId: user,
    })
    await setDoc(queryData,{...newTask})
  
    // await setDoc(doc(db,`users/${user.uid}todos`),{
    //   ...newTask
    //   })
    // console.log(queryData);

    

    //     Property 'map' does not exist on type 'Promise<{ id: string; }[]>'.ts(2339)
    // Todo.tsx(118, 15): Did you forget to use 'await'?
    // (await queryData).map(async (v) => {
    //   await setDoc(doc(db, `users/${v.id}/todos`, newTask.title), {
        // name: newtask.title,
        // age: newtask.age,
        // currentLocation: newtask.currLoc,
    //     ...newTask,
    //   });
    // });
    setDeadline("");
    setTitle("");
    setDesc("");
    console.log(task);
  };

  const deleteTask = async (id: any) => {
    // setTask(
    //   task.filter((task) => {
    //     return task.id !== taskToDelete;
    //   })
    // );
    // const taskDoc = doc(db, `users/${v.id}/todos`, id);
    // await deleteDoc(taskDoc);
    // console.log(doc(db , "/Task" , id))
    const queryData = getData();
    console.log(queryData);
    //     Property 'map' does not exist on type 'Promise<{ id: string; }[]>'.ts(2339)
    // Todo.tsx(118, 15): Did you forget to use 'await'?
    (await queryData).map(async (document) => {
      await deleteDoc(doc(db, `users/${document.id}/todos`, id));
  })};

  return (
    <>
      <div className="min-h-screen bg-[#0f172a] text-blue-50">
        <div className="mx-auto max-w-[800px] py-10 px-4">
          <form className=" flex  flex-col " onSubmit={addTask}>
            <div className="flex flex-row justify-between">
              <h1 className="text-4xl font-semibold">Todo List</h1>

              <button
                className="rounded-md bg-blue-500 p-2 text-lg font-semibold text-white"
                type="submit"
              >
                Add Task
              </button>
            </div>
            <input
              name="title"
              type="text"
              placeholder="Enter Title"
              className="text-form"
              maxLength={20}
              value={title}
              onChange={handleChange}
              required
            />
            <textarea
              name="desc"
              cols={40}
              rows={5}
              placeholder="Enter Description"
              className="text-form resize-none"
              value={desc}
              onChange={handleChange}
            />

            <label htmlFor="deadline" className="my-2 mb-8">
              Set Date :
              <input
                type="date"
                id="deadline"
                name="deadline"
                className="text-form  my-0 ml-2 p-0 px-2"
                value={deadline}
                onChange={handleChange}
              />
            </label>
          </form>

          {/* didnt specify the return */}
          {/* List Of Tasks */}
          {/* {task.map((task: ITask, key: number)=>{
            <Note task={task} key={key}/>
        })} */}
          <h1 className="mb-2 text-center text-xl font-semibold">
            {remainingTask} Tasks Remaining
          </h1>
          {task.map((task: DocumentData, key: number) => {
            return <Note key={key} task={task} Delete={deleteTask} />;
          })}
        </div>
      </div>
    </>
  );
};
export default Task;
