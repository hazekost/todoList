import axios from "axios";

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ItemType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    addedDate: string
}
type GetTasksResponseType = {
    items: Array<ItemType>
    totalCount: number
    error: string | null
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
type UpdateDataTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
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
    },
    getTasks(id: string, count: number = 10, page: number = 1) {
        return instance.get<GetTasksResponseType>(`todo-lists/${id}/tasks?count=${count}&page=${page}`)
    },
    createTask(id: string, title: string) {
        return instance.post<ResponseType<{ item: ItemType }>>(`todo-lists/${id}/tasks`, { title })
    },
    updateTask(tlid: string, taskid: string, data: UpdateDataTaskType) {
        return instance.put<ResponseType<{ item: ItemType }>>(`todo-lists/${tlid}/tasks/${taskid}`, { ...data })
    },
    deleteTask(tlid: string, taskid: string) {
        return instance.delete<ResponseType>(`todo-lists/${tlid}/tasks/${taskid}`)
    }
}