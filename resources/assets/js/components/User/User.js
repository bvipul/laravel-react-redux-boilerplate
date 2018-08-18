import React from 'react';
import ReactTable from "react-table";
import Server from '../../Helpers/Server';

import { Badge } from 'reactstrap';

import 'react-table/react-table.css';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        Server
        .get('/api/users')
        .then(response => {
            this.setState({
                data: response.data.data
            })
            console.log("response", response);
        })
        .catch(error => {
            console.log('error', error.response);
        });
    }

    render() {

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                Cell: row => (
                    <b style={{display: 'block', textAlign: 'center'}}>{row.value}</b>
                )
            }, 
            {
                Header: 'Email',
                accessor: 'email',
                Cell: row => (
                    <span style={{
                        display: 'block',
                        textAlign: 'center'
                    }}>{row.value}</span>
                )
            }, 
            {
                id: 'Admin', 
                Header: 'Admin',
                accessor: 'is_admin',
                Cell: row => (
                    <h5 style={{ textAlign: 'center'}}>
                        <Badge color={row.value === 1 ? 'success' : 'danger'}>
                            {row.value === 1 ? 'Yes' : 'No'}
                        </Badge>
                    </h5>
                )
            },
            {
                'Header': 'Actions'
            }
        ]
        return (
            <ReactTable data={this.state.data} columns={columns} defaultPageSize={5}/>
        );
    }
}

export default User;