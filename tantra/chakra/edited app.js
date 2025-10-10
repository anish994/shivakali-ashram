import \"./App.css\";
import { BrowserRouter, Routes, Route } from \"react-router-dom\";
import Navigation from \"./components/Navigation\";
import Home from \"./pages/Home\";
import ChakraDetail from \"./pages/ChakraDetail\";

function App() {
  return (
    <div className=\"App\">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path=\"/\" element={<Home />} />
          <Route path=\"/chakra/:id\" element={<ChakraDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;