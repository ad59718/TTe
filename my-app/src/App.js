import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NowPlayingMovies from './component/NowPlayingMovies';
import AllMovies from './component/AllMovies';
import SearchMovie from './component/SearchMovie';
import { clearSearchResult } from './component/redux/MovieSlice';
import { useDispatch } from 'react-redux';
import { Container, Nav, Navbar } from 'react-bootstrap';


function App() {
    const dispatch = useDispatch();
    return (
        <Router> {/* Router 시작 */}
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>영화 정보</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" onClick={()=>{dispatch(clearSearchResult())}}>현재 상영 영화</Nav.Link>
                            <Nav.Link as={Link} to="/all">모든 영화</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<SearchMovie />} />
                <Route path="/all" element={<AllMovies />} />
                <Route path="/nowplaying" element={<NowPlayingMovies />} />
            </Routes>
        </Router>
    );
}

export default App;