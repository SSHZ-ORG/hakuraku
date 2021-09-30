import React from 'react';
import {Alert, Container, Nav, Navbar, Spinner} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import './App.css';
import UMDatabaseWrapper from './data/UMDatabaseWrapper';
import CarrotJuicerPage from "./pages/CarrotJuicerPage";
import RaceDataPage from "./pages/RaceDataPage";
import SuccessionPage from './pages/SuccessionPage';
import SuccessionRelationsPage from "./pages/SuccessionRelationsPage";
import TeamAnalyzerPage from "./pages/TeamAnalyzerPage";

class App extends React.Component<{}, { umdbLoaded: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            umdbLoaded: false,
        }
    }

    componentDidMount() {
        UMDatabaseWrapper.initialize().then(() => this.setState({umdbLoaded: true}));
    }

    render() {
        if (!this.state.umdbLoaded) {
            return <div><Spinner animation="border"/> Loading UMDatabase...</div>
        }

        return (
            <HashRouter>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Hakuraku</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/succession">Succession</Nav.Link>
                                <Nav.Link as={Link} to="/successionrelations">SuccessionRelations</Nav.Link>
                                <Nav.Link as={Link} to="/carrotjuicer">CarrotJuicer</Nav.Link>
                                <Nav.Link as={Link} to="/racedata">RaceDataParser</Nav.Link>
                                <Nav.Link as={Link} to="/teamraceanalyzer">TeamRaceAnalyzer</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Item className="navbar-text">
                                    DB ver. {UMDatabaseWrapper.umdb.getVersion()}
                                </Nav.Item>
                                <Nav.Link href="https://github.com/SSHZ-ORG/hakuraku">Source Code</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Container>
                    <Switch>
                        <Route path="/succession">
                            <SuccessionPage/>
                        </Route>
                        <Route path="/successionrelations">
                            <SuccessionRelationsPage/>
                        </Route>
                        <Route path="/carrotjuicer">
                            <CarrotJuicerPage/>
                        </Route>
                        <Route path="/racedata">
                            <RaceDataPage/>
                        </Route>
                        <Route path="/teamraceanalyzer">
                            <TeamAnalyzerPage/>
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

