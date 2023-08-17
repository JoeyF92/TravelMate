import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import image from "../../assets/Logo-nav.png";
import "./Nav.css";

export default function NavigationBar() {
      return (
        <>
    <Navbar expand="lg">
      <Container>
        <NavLink to="/" className="brand-link">
          <p className="brand">
                Travel Mate
          </p>
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='icon' />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" activeKey={location.pathname}>
            <NavLink to="/" className="linkStyle">Home</NavLink>
            <NavLink to="/groups" className="linkStyle">Albums</NavLink>
            <NavLink to="/packing-list" className="linkStyle">Packing List</NavLink>
            <NavLink to="/profile" className="linkStyle">Profile</NavLink>
            <NavLink to="/welcome" className="linkStyle" onClick={() => {
                  localStorage.removeItem("token")
                  localStorage.removeItem("user_id")
                }}>Logout</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
    </>
      );
}
