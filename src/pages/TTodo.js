import React from "react";
import Create from "../components/Create";
import Note from "../components/Note";
import TNote from "../components/TNote";

  


const todoList = [
  { title: "asdada", description: "minum" ,id: 1},
  { title: "1", description: "minum" ,id: 2 }
]
  

const showDescription = (id)=>(
  console.log(id)
)

const TTodo = (props) => {
  return (
    <>
      <div className="mx-auto max-w-[800px] px-4">
        <Create />

        {todoList.map((p) => (
          <TNote tasks={p} showDesc={showDescription}/>
        ))}
        {/* <Note title={todoList[0].title} description={todoList[0].title} /> */}
        
        
      </div>
    </>
  );
};

export default TTodo;