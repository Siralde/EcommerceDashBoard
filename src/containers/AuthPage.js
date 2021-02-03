import React, { useState } from 'react';
import { Container, Form } from 'semantic-ui-react';

async function loginUser(credentials) {
    
    return fetch('http://localhost:3001/login', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
        // body: JSON.stringify(credentials)
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
        <Container>
            <Form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </Form>
        </Container>
    )
}

export default AuthPage;