import React from 'react';
import Header from './header';
import { Container } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ClientPage from '../containers/ClientPage';
import ProductPageG from '../containers/ProductPageG';
import ProductPageJ from '../containers/ProductPageJ';


function layout(){
    return (
        <Container>
            <Header/> 
            <Switch>
                <Route exact path="/"><Redirect to="/clients"/></Route>
                <Route path="/clients" component={ClientPage}/>
                <Route path="/productsG" component={ProductPageG}/>
                <Route path="/productsJ" component={ProductPageJ}/>
            </Switch>
        </Container>
    )
}

export default layout;