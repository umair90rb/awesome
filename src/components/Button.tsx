import {Button} from 'react-native'

export interface CustomButtonProps {
    title: string,
    onPress: () => void;
    disabled: boolean
}

const CustomButton = (props: CustomButtonProps) => {
    return <Button color={'blue'} {...props} />
}

export default CustomButton;