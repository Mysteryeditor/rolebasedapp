import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('')
    const [id, setId] = useState('')
   
    const Type = React.createContext(userType)

     const submitData = (data) => {
        setName(data.name);
        setPassword(data.password);
       
    }

    const fetchData = () => {
        axios.get(`http://localhost:4000/Accounts?name_like=${name}`)
            .then((data) => {
                setName(data.data[0]);
                setPassword(data.data[0]);
                setUserType(data.data[0].userType)
                console.log(data.data[0].userType )
                setId(data.data[0])
            })
            .then(() => {
                
            })
    }
    useEffect(()=>{
fetchData()
    },[])


    return (
        <div>
            <div className='pb-3 mx-auto shadow col-lg-4 m-3'>
                <h3 className='p-3 '>Login</h3>
                <Form className='m-3' id='myform' onSubmit={handleSubmit(submitData)}>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="3">
                            Name
                        </Form.Label>
                        <Col >
                            <Form.Control type='text' name='name' placeholder='Name' {...register("name", { required: true, maxLength: 16 })} />
                            {errors.name && <span className='text-danger'>Name is required</span>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="3">
                            Password
                        </Form.Label>
                        <Col >
                            <Form.Control type="password" placeholder="Password" name='password' {...register('password', {
                                required: "Password is required",
                                pattern: {
                                    value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                                    message: "Password must contain atleast one uppercase ,lowercase , number and a special character"
                                }
                            })} />
                            {errors.password && <span className='text-danger'>{errors.password.message}</span>}

                        </Col>
                    </Form.Group>

                    {/* <Form.Group as={Row} className="mb-3" >

                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3" name='type' >
                                <Form.Check
                                    inline
                                    label="Admin"
                                    name="group1"
                                    type={type}
                                    value="Admin"
                                    id={`inline-${type}-1`}
                                    {...register('type', { required: true })}
                                />
                                <Form.Check
                                    inline
                                    label="User"
                                    name="group1"
                                    type={type}
                                    value="User"
                                    id={`inline-${type}-2`}
                                    {...register('type', { required: true })}
                                />

                            </div  >
                        ))}
                        {errors.type && <span className='text-danger'>Please select the Type</span>}

                    </Form.Group> */}


                    <Button variant="info" className='text-white m-3' type='submit'>Submit</Button>

                </Form>

            </div>
        </div>
    )
}

export default Login