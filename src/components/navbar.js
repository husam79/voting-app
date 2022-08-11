import '../index.css';
import { Link, Outlet, NavLink } from "react-router-dom";

export default function Navbar({ activeItem }) {
    let activeStyle = {
        backgroundColor: '#555'
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink to='/' className="navbar-brand">التصويت الداخلي</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to='/vote' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>صوّت الآن</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/about' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>حول</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    )
}