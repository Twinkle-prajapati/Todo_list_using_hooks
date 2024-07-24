import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




export default function Todo() {
    const getlocalstorage=()=>{
        const storedtodos =JSON.parse(localStorage.getItem("todos"))
        return storedtodos || []
    }

    const[input,setInput]=useState("")
    const[todos,setTodos]=useState(getlocalstorage())
    const[error,setError]=useState("")
    const[editindex,seteditIndex]=useState(null)




    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todos))
    },[todos])

    const handleInput=()=>{
        if(input.trim() === "")
        {
            setError("input can't be empty")
        }
        else
        {
            if(editindex !== null){
                const updatedtodos = todos.map((todo,index)=> index === editindex ? input : todo)
                setTodos(updatedtodos)
                seteditIndex(null)
            }
            else{
                setTodos([...todos,input]);
            }
            setInput("")
            setError("")

        }

    }

    const handleDelete=(index)=>{
        setTodos(todos.filter((_, i) => i !== index))
    }


    const handleEdit=(index)=>{
        seteditIndex(index)
        setInput(todos[index])
    }

  return (
    <>

<Container className='d-flex flex-column justify-content-center align-items-center vh-100'>

    <Card style={{width:"22rem"}}>
    <InputGroup className="p-3">
        <Form.Control
          placeholder="Add To-do"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />
        <Button onClick={handleInput}>{editindex !== null ? "Update" : "Add"}</Button>
      </InputGroup>
      {error && <p className='text-danger ps-4'>{error}</p>}
    </Card>
    <div style={{ overflowY: "scroll", maxHeight: "15rem", width: "22rem"}}>
    {todos.map((todos,index)=>(
    <Card key={index} className='mt-2'>
        <div className='p-2 d-flex justify-content-between align-items-center'>
            <span className='ps-2'>{todos}</span>
            <div>
                <EditIcon className='mx-2 text-success' onClick={()=>{handleEdit(index)}}/>
                <DeleteIcon className='mx-2 text-danger' onClick={()=>handleDelete(index)}/>
            </div>

        </div>
    </Card>

    ))}
</div>
</Container>

    </>

  )
}
