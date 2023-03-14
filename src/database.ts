import { COURSE_STACK, TCourse, TStudent } from "./types"
//banco de dados mockado, ja que ainda não utilizamos algum banco de dados

export const courses: TCourse[] = [
    {
        id: "c001",
        name: "React",
        lessons: 12,
        stack: COURSE_STACK.FRONT
    },
    {
        id: "c002",
        name: "Styled Components",
        lessons: 4,
        stack: COURSE_STACK.FRONT
    },
    {
        id: "c003",
        name: "Express",
        lessons: 5,
        stack: COURSE_STACK.BACK
    }
]

export const students: TStudent[] = [
    { 
    id: "10",
    name: "Camila",
    age: 28
    },
    { 
        id: "20",
        name: "Tiago",
        age: 29
        },
        
]
