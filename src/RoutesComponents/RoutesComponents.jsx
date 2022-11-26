import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import AddEleve from '../components/eleves/AddEleve';
import AddManip from '../components/manip/AddManip';
import AttributeManip from '../components/manip/AttributeManip';
import AddOption from '../components/options/AddOption';
import Dashborad from '../pages/Dashborad';
import Eleves from '../pages/Eleves';
import Inscription from '../pages/Inscription';
import Login from '../pages/Login';
import Manip from '../pages/Manip';
import Options from '../pages/Options';

function RoutesComponents() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/inscription' element={<Inscription />} />
                <Route path="/dashboard" element={<Dashborad />} />
                <Route path="/eleves" element={<Eleves />} />
                <Route path="/options" element={<Options />} />
                <Route path="/eleves/addEleve" element={<AddEleve />} />
                <Route path="/manip" element={<Manip />} />
                <Route path="/manip/AddManip" element={<AddManip />} />
                <Route path="/options/addOption" element={<AddOption />} />
                <Route path='/manip/attributeManip' element={<AttributeManip />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponents