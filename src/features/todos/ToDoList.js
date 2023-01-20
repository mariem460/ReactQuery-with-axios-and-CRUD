import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {getToDos, postToDos, patchToDos, deleteToDos} from "../../api/toDosApi";
import { FaBeer } from 'react-icons/fa';
import {faTrash, faUpload} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import '../../index.css'

const ToDoList = () => {
    const [newToDo, setNewToDo] = useState("");
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        error,
        data: todos
    } = useQuery("todos", getToDos)
    const postTodoMutation = useMutation(postToDos, {
        onSuccess: () => {
            //invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })


    const patchTodoMutation = useMutation(patchToDos, {
        onSuccess: () => {
            //invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })

    const deleteTodoMutation = useMutation(deleteToDos, {
        onSuccess: () => {
            //invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        postTodoMutation.mutate({userId: 8, title: newToDo, completed: true})
        setNewToDo("")
        
        }
        const iconStyle = {
            height: "15px",
            width: "20px",
        }
        const newItemSection = (
            <form onSubmit={handleSubmit}>
                <label htmlFor="new-todo">Enter a new todo item</label>
                <div className="new-todo">
                    <input
                        type="text"
                        id="new-todo"
                        value={newToDo}
                        onChange={(e) => setNewToDo(e.target.value)}
                        placeholder="Enter new todo"
                    />
                </div>
                <button className="submit">
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRErFsXz36oaNoYbc5hzcnDQ36H7vAyCiIErpQTMjBMA&s' alt='icon'
                    style={iconStyle}/>
                </button>
            </form>
        )
        let content ;
        if (content) {
            content =  <p>Loading... {isLoading}</p>
        }else if (isError) {
            content = <p>{error.message}</p>;
        }else {
            content = JSON.stringify(todos)
        }
  return (
    <main>
        <h1>TO DO LIST </h1>
        {newItemSection}
        {content}
      
    </main>
  )
}

export default ToDoList
