// import React, { FC } from "react";
// import { ITask } from "../interface";

// interface props {
//   task: ITask;
// }

// const Note = ({ task }: props) => {
//   return (
//     <div>
//       <div className=" cursor-pointer border-4 bg-slate-600 p-2 font-medium text-cyan-500">
//         <div className="flex flex-row justify-between">
//           <h1>{task.title}</h1>
//           <button>Delete</button>
//         </div>
//         <p>{task.desc}</p>
//         <p>{task.deadline}</p>
//       </div>
//     </div>
//   );
// };
// export default Note;
import { DocumentData } from "firebase/firestore";
import React, { useState } from "react";

interface Props {
  task: DocumentData;
  // completeTask(taskNameToDelete: string): void;
  Delete(taskToDelete: number): void;
}

const Note = ({ task, Delete }: Props) => {
  const [ShowDesc, setShowDesc] = useState<boolean>();
  return (
    <div className="task" >
      <div className="mb-4 rounded-md bg-slate-700 p-2 text-blue-50" onClick={() => setShowDesc(!ShowDesc)} >
        <h1 className="inline transform font-semibold uppercase">
          {task.title}
        </h1>
        <span className="text-sm opacity-50"> {task.deadline}</span>
        <button
          className="float-right w-7 rounded-md bg-red-600"
          onClick={() => {
            Delete(task.id);
          }}
        >
          X
        </button>

        <p>{task.uid}</p>
        <p>{ShowDesc && task.desc}</p>
      </div>
    </div>
  );
};

export default Note;
