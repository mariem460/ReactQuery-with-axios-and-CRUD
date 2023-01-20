import axios from 'axios'


const todosApi = axios.create({
    baseURL: "http://localhost:3000"
})

export const getToDos = async ()=>  {
    const response = await todosApi.get("/todos")
    return response.data;
}

export const postToDos = async (todo) => {
    //this methos receives a TODO so it should have a paramater
    // we pass the TODO with the endpoint "/todos"
    return await todosApi.post("/todos", todo)
}

export const patchToDos = async (todo) => {
    return await todosApi.patch(`/todos/${todo.id}`)
}
export const deleteToDos = async ({id}) => {
    const response = await todosApi.delete(`/todos/${id}`, id)
    return response.data; 
}
export default todosApi;
/*
export const getTodos = async () => {
    await axios.get("http://localhost:3000")
    .then(response => console.log(response.data))
}
*/