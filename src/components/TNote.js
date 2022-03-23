import React, { FC } from "react";



const TNote= ({tasks, showDesc}) => {
  return (
    <div>
      <div
        className=" border-4 bg-slate-600 p-2 font-medium text-cyan-500"
        
      >
        <div className="flex flex-row justify-between"onClick={() => showDesc(tasks.id)}>
          <h1>{tasks.title}</h1>
          <button>Delete</button>
        </div>
        <p>{tasks.description}</p>
      </div>
    </div>
  );
};
export default TNote;