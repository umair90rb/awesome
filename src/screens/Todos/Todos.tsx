import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoSelector } from "../../store/todo/todo.selector";
import Todo from "../../components/Todo";
import Input from "../../components/Input";
import { Todo as TTodo } from "../../store/todo/todo.type";
import { SafeAreaView, StyleSheet, View } from "react-native";
import CustomButton from "../../components/Button";
import {TodoActions} from "../../store/todo/todo.type"

const AddTodo: React.FC = () => {
    const [todo, setTodo] = useState('');
    const dispatch = useDispatch()

    const handleOnPress = () => {
        dispatch({type: TodoActions.ADD_TODO, payload: {todo, completed: false}});
        setTodo('')
    }

    return (
        <View style={styles.addTodoContainer}>
            <Input value={todo} onChangeText={setTodo}/>
            <CustomButton disabled={false} title="Add Todo" onPress={handleOnPress} />
        </View>
    );
}


const Todos: React.FC = () => {
    const todos = useSelector(todoSelector)
    console.log(todos, 'todos');
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <AddTodo />
                {/* {todos.map((todo: TTodo, index: number) => (<Todo key={index} {...todo} />))} */}
            </SafeAreaView>
        </View>
    )
}

export default Todos;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    addTodoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderColor: 'black',
        borderWidth: 0,
        width: '80%',
        marginBottom: 50,
        marginTop: 50
    }

})