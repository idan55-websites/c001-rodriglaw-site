import { Route, Routes } from "react-router-dom";
import Accessibility from "./pages/Accessibility";
import About from "./pages/About";
// import Book from "./pages/Book";
// import Connected from "./pages/Connected";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Services from "./pages/Services";
import Layout from "./Layout/Layout";
import { languages, localizePath } from "./utils/siteRoutes";

function App() {
  return (
    <>
      <Routes>
        {languages.map(language => <Route key={language} path={localizePath('/', language)} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="accessibility" element={<Accessibility />} />
          <Route path="about" element={<About />} />
          {/* Google Calendar booking flow is temporarily disabled. */}
          {/* <Route path="book" element={<Book />} /> */}
          {/* <Route path="connected" element={<Connected />} /> */}
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="services" element={<Services />} />
        </Route>)}
      </Routes>
    </>
  );
}

export default App;
