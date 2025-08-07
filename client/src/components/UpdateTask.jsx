import React from "react";
export const UpdateTask = ()=>{
    const handleSubmit = ()=>{}
    const handleInputChange = (setter)=>(e)=>{
        setter(e.target.value());
    }
    return <>
            <form onSubmit={handleSubmit}>
                    <h3>Title</h3>
                    <input type="text"
                    value={title}
                    onChange={handleInputChange(setTitle)}
                    placeholder="Enter Title"
                    />

                    <h3>Description</h3>
                    <input type="text"
                    value={description}
                    onChange={handleInputChange(setDescription)}
                    placeholder="Enter Description"
                    />
                    <div>
                        <button type="submit">Add Task</button>
                    </div>
            </form>
            </>
}