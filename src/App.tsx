import React from 'react';
import {Alert, Container, Nav, Navbar, NavDropdown, Spinner} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import './App.css';
import UMDatabaseWrapper from './data/UMDatabaseWrapper';
import CarrotJuicerPage from "./pages/CarrotJuicerPage";
import RaceDataPage from "./pages/RaceDataPage";
import RoomRaceAnalyzerPage from "./pages/RoomRaceAnalyzerPage";
import SuccessionPage from './pages/SuccessionPage';
import SuccessionRelationsPage from "./pages/SuccessionRelationsPage";
import TeamAnalyzerPage from "./pages/TeamAnalyzerPage";
import StoriesPage from "./pages/StoriesPage";

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
                                <Nav.Link as={Link} to="/stories">Stories</Nav.Link>
                                <NavDropdown title="CarrotJuicer Tools" id="carrotjuicer-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/carrotjuicer">
                                        Packet / Race Inspector
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/racedata">
                                        Race Scenario Parser
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/teamraceanalyzer">
                                        Team Race Analyzer
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/roomraceanalyzer">
                                        Room Race Analyzer
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav.Item className="navbar-text">
                                    DB ver. {UMDatabaseWrapper.umdb.version}
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
                        <Route path="/stories">
                            <StoriesPage/>
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
                        <Route path="/roomraceanalyzer">
                            <RoomRaceAnalyzerPage/>
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

