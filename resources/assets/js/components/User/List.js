import React from 'react';
import ReactTable from "react-table";
import Server from '../../Helpers/Server';
import { Link } from 'react-router-dom';

import { Badge, Button, ButtonGroup, Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import 'react-table/react-table.css';

class List extends React.Component {

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
                Header:  () => <b>Id</b>,
                accessor: 'id',
                maxWidth: 40,
                Cell: row => (
                    <span style={{display: 'block', textAlign: 'center'}}>{row.value}</span>
                )
            },
            {
                Header: () => <b>Name</b>,
                accessor: 'name',
                Cell: row => (
                    <b style={{display: 'block', textAlign: 'center'}}>{row.value}</b>
                )
            }, 
            {
                Header: () => <b>Email</b>,
                accessor: 'email',
                Cell: row => (
                    <span style={{
                        display: 'block',
                        textAlign: 'center'
                    }}>{row.value}</span>
                )
            }, 
            {
                Header: () => <b>Admin</b>,
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
                Header: () => <b>Actions</b>,
                Cell: row => (
                    <ButtonGroup style={{ display: 'block', textAlign: 'center'}}>
                        <Link className="btn btn-secondary" to={`/admin/user/${row.row.id}/edit`} title="Edit">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </Link>
                        <Button title="Delete">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                    </ButtonGroup>
                )
            }
        ]
        return (
            <React.Fragment>
                <Card>
                    <CardHeader className="text-center">
                        <Row>
                            <Col md={8} className="text-right">
                                <h1 style={{ display: 'inline-block', textTransform: 'uppercase', letterSpacing: '5px' }}>User Management</h1>
                            </Col>
                            <Col md={4} className="text-right">
                                <Link to='/admin/user/create'>
                                    <Button color="primary">
                                        <i className="fa fa-plus-circle"></i> Add New
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={this.state.data}
                            columns={columns}
                            defaultPageSize={5}
                            className="-striped -highlight"
                        />
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default List;