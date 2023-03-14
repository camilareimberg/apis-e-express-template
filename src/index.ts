import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { TCourse, TStudent } from './types'

//o app tem acesso ao que a biblioteca express nos fornece
const app = express()

app.use(express.json())
app.use(cors())

//indica onde vai rodar o nosso servidor, no caso na porta 3003
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//contrução no endpoint no express - é um endpoint get (poderia ser delete, post, push...são métodos do endpoint)
// metodo get
//rota '/ping'
//handler é o restante da função. É a função calback que realiza algo na API e envia a resposta para o usuário
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//pegar os cursos. Req é uma requisição que está sendo solicitada ao front. É uma tipagem do próprio express
//queremos enviar como resposta todos os cursos
//res.send é o que queremos enviar como resposta
// após criar isso, vai no postman e testa com o link http://localhost:3003/courses - cria uma requisição chama get
app.get('/courses', (req: Request, res: Response) => {
res.send(courses)
})

//quando faz alguma alteração, precisa parar o servidos com o ctrl + c e rodar novamente
//para não precisar parar toda hora e rodar novamente, cria um script com o tes-node-dev e executa o npm run dev, ver material assincrono pois precisa instalar algumas coisas

//  ENDPOINT que faz uma consulta de todos os cursos e filtra baseado em uma query params - by name

app .get('/courses/search', (req: Request, res: Response) => {
    
    //estamos falando pro cód que o q vamos receber será um string, assim não dá erro na inha 49 quando usa o includes
    const q= req.query.q as String
    //para cada elemento do course ele vai buscar um curso específico. Queremos ver se o name é igual ao q (query que está recebendo). A tipagem abaixo será o array de cursos que foi criado (types)

    const filteredCourses: TCourse[] = courses.filter((course)=> {
//deu erro quando rodamos, por isso temos essa verificação abaixo sobre o q. Se ele existe faz a verificação, caso não retorna todos os cursos
if(q)
{
       //abaixo vai ver se o nome do curso inclui
        return course.name.toLowerCase().includes(q.toLowerCase())
}
     return course
    })
    //se der certo, o status retornado será 200 (se não colocasse o número, por padrão ja sairia 200) e ai por fim quer que envie o filtered courses
res.status(200).send(filteredCourses)

})

//pode ter a mesma url quando são dois métodos diferente, por ex., um é get e o outro é post
//post que vai CRIAR um novo curso
app.post('/courses', (req: Request, res: Response)=> {
    //recebeu um body e espera que ele tenha as 4 infos na linha 64
    const body = req.body
    //infos que precisa para criar um novo curso
    const {id, name, lessons, stack} = body
    //quando recebeu o novo curso, chamou ele de newCourse
const newCourse: TCourse = {
    id,
    name,
    lessons,
    stack
}
//adiciona o novo curso no nosso array com o push
courses.push(newCourse)
//status 201 significa created
res.status(201).send("Curso adicionado com sucesso")

})

//EXERCICIO DE FIXAÇÃO
//1 - get all students
app.get('/students', (req: Request, res: Response) => {
    res.send(students)
})



//2 get students by name
app .get('/students/search', (req: Request, res: Response) => {
const q= req.query.q as String
const filteredStudents: TStudent[] = students.filter((student) =>
{
if (q) {
    return student.name.toLowerCase().includes(q.toLowerCase())
}
return student
})
res.status(200).send(filteredStudents)
})

//ex. de url para buscar Camila no postman: http://localhost:3003/students/search?q=camila

//3 Create student
app.post('/students', (req: Request, res: Response)=>
{
const body = req.body
const {id, name, age} = body
const newStudents: TStudent = {
   id,
   name,
   age
    }
    students.push(newStudents)
    res.status(201).send("Curso adicionado com sucesso")

})

//link do POSTMAN para verificaçõea https://web.postman.co/workspace/My-Workspace~8eabdb58-489f-42bc-805a-f7fabaf63a2c/request/26335749-08331ad4-c61c-4061-a8c9-ab111c1e30fd