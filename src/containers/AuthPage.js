import React, { useState } from 'react';
import { Segment, Form, Button, Container } from 'semantic-ui-react';

async function loginUser(credentials) {
    
    return fetch('http://localhost:3001/login', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(data => data.json())
}


function AuthPage({setToken}){

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser( {username, password} );

        setToken(token);
    }

    return (
        <Container style={AuthStyle}>
            <Segment piled>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Username</label>
                        
                        <input type="text" onChange={e => setUsername(e.target.value)} />
                    </Form.Field>
                    <Form.Field>  
                        <label> Password </label>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </Form.Field>
                    <Button positive type="submit">Submit</Button>
                </Form>
            </Segment>
        </Container>
    )
}

const AuthStyle = {
    width: "50%",
    marginTop: "50px"
}

export default AuthPage;