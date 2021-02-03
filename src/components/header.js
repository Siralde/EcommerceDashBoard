import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function header() 
{
    return (
        <Menu fluid widths={3}>
            
            <Menu.Item>
                <h1>
                    Panel de Administración
                </h1>
            </Menu.Item>

            <Menu.Item>
                <Link to={`/clients`}>
                    <h3>
                        Clientes
                    </h3>
                </Link>
            </Menu.Item>

            <Menu.Item>
                
                <Link to={`/productsG`}>
                    <h3>
                        Productos
                    </h3>
                </Link>
                
            </Menu.Item>
            
        </Menu>
    )
};

export default header;
