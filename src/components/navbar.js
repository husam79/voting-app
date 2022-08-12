import '../index.css';
import { Link, Outlet, NavLink } from "react-router-dom";
import { useContext, useState } from 'react';
import { UserContext } from '../App';

export default function Navbar({ activeItem }) {
    const [isHover, setIsHover] = useState(false);

    let linkStyle = {
        fontSize: '0.75rem',
        padding: 4,
        textDecoration: 'none',
        borderRadius: 2,
        /*textDecoration: isHover ? 'underline' : 'none',*/
        backgroundColor: isHover ? '#555' : '#212529'
    }

    const obj = useContext(UserContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink to='/' className="navbar-brand">التصويت الداخلي</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink to='/vote' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>صوّت الآن</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/about' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>حول</NavLink>
                            </li>
                        </ul>

                        <div className='d-flex align-items-center' >
                            <span className='text-light'>مرحبًا {obj.user !== null ? obj.user.full_name.split(' ')[0] + "!" : ""}</span>
                            &nbsp;&nbsp;&nbsp;
                            <Link
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                className='text-light'
                                style={linkStyle}
                                to="/logout">خروج</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    )
}