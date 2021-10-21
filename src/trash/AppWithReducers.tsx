// import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
// import { Menu } from '@material-ui/icons';
// import { useReducer } from 'react';
// import { v1 } from 'uuid';
// import { AddItemForm } from './AddItemForm';
// import './App.css';
// import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './store/tasks-reducer';
// import { changeTodoListFilterAC, todoListsReducer, removeTodoListAC, addTodoListAC, changeTodoListTitleAC } from './store/todoLists-reducer';
// import { TodoList } from './TodoList';

// export type FilterType = "all" | "completed" | "active"
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
// export type TasksType = {
//     [key: string]: Array<TaskType>
// }

// function AppWithReducers() {

//     let todoListId1 = v1()
//     let todoListId2 = v1()

//     let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
//         { id: todoListId1, title: "What to learn", filter: "all" },
//         { id: todoListId2, title: "What to buy", filter: "all" }
//     ])
//     let [tasks, dispatchTasks] = useReducer(tasksReducer, {
//         [todoListId1]: [
//             { id: v1(), title: "HTML & CSS", isDone: true },
//             { id: v1(), title: "JS", isDone: true },
//             { id: v1(), title: "ReactJS", isDone: false }
//         ],
//         [todoListId2]: [
//             { id: v1(), title: "Milk", isDone: true },
//             { id: v1(), title: "Bread", isDone: false }
//         ]
//     })

//     function removeTask(tlid: string, id: string) {
//         dispatchTasks(removeTaskAC(tlid, id))
//         // setTasks({ ...tasks, [tlId]: tasks[tlId].filter(t => t.id !== id) })
//     }
//     function addTask(tlid: string, title: string) {
//         dispatchTasks(addTaskAC(tlid, title))
//         // setTasks({ ...tasks, [tlId]: [...tasks[tlId], { id: v1(), title, isDone: false }] })
//     }
//     function changeStatus(tlid: string, id: string, isDone: boolean) {
//         dispatchTasks(changeTaskStatusAC(tlid, id, isDone))
//         // setTasks({ ...tasks, [tlId]: tasks[tlId].map(t => t.id === id ? { ...t, isDone } : t) })
//     }
//     function changeTaskTitle(tlid: string, id: string, title: string) {
//         dispatchTasks(changeTaskTitleAC(tlid, id, title))
//         // setTasks({ ...tasks, [tlId]: tasks[tlId].map(t => t.id === taskId ? { ...t, title } : t) })
//     }
//     function changeFilter(id: string, filter: FilterType) {
//         dispatchTodoLists(changeTodoListFilterAC(id, filter))
//         // setTodoLists(todoLists.map(tl => tl.id === tlID ? { ...tl, filter } : tl))
//     }
//     function removeTodoList(id: string) {
//         let action = removeTodoListAC(id)
//         dispatchTodoLists(action)
//         dispatchTasks(action)
//         // delete tasks[id]
//         // setTodoLists(todoLists.filter(tl => tl.id !== id))
//     }
//     function addTodoList(title: string) {
//         let action = addTodoListAC(title)
//         dispatchTodoLists(action)
//         dispatchTasks(action)
//         // const id = v1()
//         // setTodoLists([{ id, title, filter: "all" }, ...todoLists])
//         // setTasks({ ...tasks, [id]: [] })
//     }
//     function changeTodoListTitle(id: string, title: string) {
//         dispatchTodoLists(changeTodoListTitleAC(id, title))
//         // setTodoLists(todoLists.map(tl => tl.id === id ? { ...tl, title } : tl))
//     }

//     return (
//         <div className="AppWithReducers">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton>
//                         <Menu />
//                     </IconButton>
//                     <Typography variant="h6">
//                         LogOut
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed >
//                 <Grid container style={{ padding: "10px" }}>
//                     <AddItemForm addItem={addTodoList} />
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {todoLists.map(tl => {

//                         let tasksForTodoList = tasks[tl.id]
//                         if (tl.filter === "active") {
//                             tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
//                         } else if (tl.filter === "completed") {
//                             tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
//                         }

//                         return <Grid key={tl.id} item>
//                             <Paper style={{ padding: "10px" }}>
//                                 <TodoList
//                                     id={tl.id}
//                                     title={tl.title}
//                                     tasks={tasksForTodoList}
//                                     filter={tl.filter}
//                                     removeTask={removeTask}
//                                     changeFilter={changeFilter}
//                                     changeStatus={changeStatus}
//                                     removeTodoList={removeTodoList}
//                                     changeTodoListTitle={changeTodoListTitle}
//                                     changeTaskTitle={changeTaskTitle}
//                                     addTask={addTask} />
//                             </Paper>
//                         </Grid>
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }

// export default AppWithReducers;

export const AppWithReducers = () => { }