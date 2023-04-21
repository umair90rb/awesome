import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./Button";
import { useDispatch } from "react-redux";
import { TodoActions } from "../store/todo/todo.type";

export interface TodoItemProps {
    todo: string,
    completed: boolean,
    id: number
}

const Todo = ({
 completed, todo, id
}: TodoItemProps) => {
    const dispatch = useDispatch()

    const handleOnPress = () => {

    }

    return (<View style={styles.container} >
        <Text>{id}.{todo} ({completed && 'Done' })</Text>
        <CustomButton disabled={completed} title="Done" onPress={() => dispatch({type: TodoActions.COMPLETE_TODO, payload: {id}})} />
    </View>)
}

const styles = StyleSheet.create({
    container: {
        margin: 1,
        paddingHorizontal: 3,
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Todo