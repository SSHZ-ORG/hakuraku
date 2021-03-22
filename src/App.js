import './App.css';
import React from 'react';
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import SuccessionPage from './pages/SuccessionPage';
import UMDatabaseWrapper from './data/UMDatabaseWrapper';
import {Alert, Container, Nav, Navbar, Spinner} from "react-bootstrap";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            umdbLoaded: false,
        }
    }

    componentDidMount() {
        UMDatabaseWrapper.initialize().then(() => this.setState({umdbLoaded: true}));
    }

    render() {
        if (this.state.umdbLoaded === false) {
            return <div><Spinner animation="border"/> Loading UMDatabase...</div>
        }

        return (
            <HashRouter>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand as={Link} to="/">Hakuraku</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/succession">Succession</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Container>
                    <Switch>
                        <Route path="/succession">
                            <SuccessionPage/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </Container>
            </HashRouter>
        );
    }
}

function Home() {
    return <Alert variant="primary">Nothing here yet</Alert>
}

export default App;

