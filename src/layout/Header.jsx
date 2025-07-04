import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/layout/Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogin = () => {
        navigate('/login');
        setIsMenuOpen(false);
    };

    const handleRegister = () => {
        navigate('/register');
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    const handleProfile = () => {
        navigate('/profile');
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <h2>ProfJob</h2>
                    </Link>
                </div>
                
                <nav className="nav-menu">
                    <ul>
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/test">Тест</Link></li>
                        {user?.role === 'student' && (
                            <li><Link to="/vacancies">Вакансии</Link></li>
                        )}
                        {user?.role === 'employer' && (
                            <>
                                <li><Link to="/my-vacancies">Мои вакансии</Link></li>
                                <li><Link to="/applications">Отклики</Link></li>
                            </>
                        )}
                    </ul>

                    {user ? (
                        <div className="user-controls">
                            <button className="profile-button" onClick={handleProfile}>
                                {user.nickname}
                            </button>
                            <button className="logout-button" onClick={handleLogout}>
                                Выйти
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <button className='login-button' onClick={handleLogin}>
                                Войти
                            </button>
                            <button className='register-button' onClick={handleRegister}>
                                Регистрация
                            </button>
                        </div>
                    )}
                </nav>

                <div className="mobile-menu">
                    <div className="burger-menu" onClick={toggleMenu}>
                        <div className={`burger-line ${isMenuOpen ? 'active' : ''}`}></div>
                        <div className={`burger-line ${isMenuOpen ? 'active' : ''}`}></div>
                        <div className={`burger-line ${isMenuOpen ? 'active' : ''}`}></div>
                    </div>
                    
                    <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
                        <ul>
                            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Главная</Link></li>
                            <li><Link to="/test" onClick={() => setIsMenuOpen(false)}>Тест</Link></li>
                            {user?.role === 'student' && (
                                <li>
                                    <Link to="/vacancies" onClick={() => setIsMenuOpen(false)}>
                                        Вакансии
                                    </Link>
                                </li>
                            )}
                            {user?.role === 'employer' && (
                                <>
                                    <li>
                                        <Link to="/my-vacancies" onClick={() => setIsMenuOpen(false)}>
                                            Мои вакансии
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/applications" onClick={() => setIsMenuOpen(false)}>
                                            Отклики
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        {user ? (
                            <div className="mobile-user-controls">
                                <button className='mobile-profile-button' onClick={handleProfile}>
                                    {user.nickname}
                                </button>
                                <button className='mobile-logout-button' onClick={handleLogout}>
                                    Выйти
                                </button>
                            </div>
                        ) : (
                            <div className="mobile-auth-buttons">
                                <button className='mobile-login-button' onClick={handleLogin}>
                                    Войти
                                </button>
                                <button className='mobile-register-button' onClick={handleRegister}>
                                    Регистрация
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;