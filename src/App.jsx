import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./screens/welcome";
import SelectInstitution from "./screens/select_institution";
import Login from "./screens/login";
import Success from "./screens/success";
import Linking from "./screens/linking";
import AlreadyLinked from "./screens/already_linked";

function App() {
  return (
    <Router>
      <Routes>
        {/* TODO: make sure id is a valid UUID */}
        {/* remove id path params? */}
        <Route path="/link_portals/:id" element={<Welcome />} />
        <Route path="/link_portals/:id/select_institution/" element={<SelectInstitution />}/>
        <Route path="/link_portals/:id/login/" element={<Login />} />
        <Route path="/link_portals/:id/already_linked/" element={<AlreadyLinked />} />
        <Route path="/link_portals/linking" element={<Linking />} />
        <Route path="/link_portals/success/" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
