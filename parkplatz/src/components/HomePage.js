import React from 'react';

const HomePage = () => {
    return (
        <div className="container-fluid containerStyle">
            <div className="row">
                <div className="col-lg-3 sidebarColor sidebar sidebar-sticky p-0">
                    <nav className="navbar navbar-expand-lg flex-lg-column">
                        <a className="h2 titleLogo mt-3 mb-3">ParkPlatz</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon">
                                <i className="fas fa-bars colorIcon"></i>
                            </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav flex-lg-column">
                                <button className="nav-item nav-link enlacesMenu text-white lead">Ingresar Visitantes</button>
                                <button className="nav-item nav-link enlacesMenu text-white lead">Ingresar Residentes</button>
                                <button className="nav-item nav-link enlacesMenu text-white lead">Lista de Visitantes</button>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="col-lg-9">
                    <div className="text-center mt-4 mb-4">
                        <img src="img/logoEasyRegister.png" className="img-fluid imageLogo" alt="Logo de ParkPlatz" />
                    </div>
                    <div id="container"></div>
                    <div id="containerPhoto"></div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
