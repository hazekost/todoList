import axios from "axios";

type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': '6c600c87-cd10-4399-80d8-d0a35356bfb5'
    }
})

export const todoAPI = {
    getTodos() {
        return instance.get<Array<TodoListType>>(`todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, { title })
    },
    deleteTodo(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoTitle(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, { title })
    }
}