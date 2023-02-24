import {useState} from "react";

export const useForm = (inputValues: any): any => {
    const [value, setValue] = useState(inputValues);
    return {value, setValue};
}