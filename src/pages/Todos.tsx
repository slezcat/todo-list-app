import { ChangeEvent, useState } from "react";
import Note from "../components/Note";

import { DocumentData } from "firebase/firestore";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Task = ({ tasks, user, addTask, deleteTask, logout }: any) => {
  let navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const remainingTask = tasks.length;

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title) {
      alert("Please add a task");
      return;
    }
    addTask({ title, desc, deadline });
    setDeadline("");
    setTitle("");
    setDesc("");
  };

  return (
    <>
      <div className="min-h-screen bg-[#0f172a] text-blue-50">
        <div className="mx-auto max-w-[800px] py-10 px-4">
          <form className=" flex  flex-col " onSubmit={onSubmit}>
            <h1 className="text-center text-4xl font-semibold">Todo List</h1>
            <div className="flex flex-row justify-between">
              {user == null ? (
                <>
                  <h4>Log in to get started</h4>
                  <div>
                    <Button
                      onClick={() => navigate("/login")}
                      variant="contained"
                      color="success"
                      className="ml-2"
                    >
                      Log in
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h4> {user?.email}</h4>
                  <div>
                    <Button
                      onClick={logout}
                      variant="contained"
                      color="secondary"
                      className="ml-2"
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              )}
            </div>
            <input
              name="title"
              type="text"
              placeholder="Enter Title"
              className="text-form"
              maxLength={20}
              value={title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
              required
            />
            <textarea
              name="desc"
              cols={40}
              rows={5}
              placeholder="Enter Description"
              className="text-form resize-none"
              value={desc}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setDesc(event.target.value)
              }
            />
            <div className="flex justify-between">
              <label htmlFor="deadline" className="my-2 mb-8">
                Set Date :
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  className="text-form  my-0 ml-2 p-0 px-2"
                  value={deadline}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setDeadline(event.target.value)
                  }
                />
              </label>
              {user != null && (
                <button
                  className="rounded-md bg-blue-500 p-2 text-lg font-semibold text-white"
                  type="submit"
                >
                  Add Task
                </button>
              )}
            </div>
          </form>

          <h1 className="mb-2 text-center text-xl font-semibold">
            {remainingTask} {remainingTask === 1 ? "Task" : "Tasks"} Remaining
          </h1>
          {tasks.map((task: DocumentData, key: number) => {
            return <Note key={key} task={task} Delete={deleteTask} />;
          })}
        </div>
      </div>
    </>
  );
};
export default Task;
