import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExpenseTracker from "./components/ExpenseTracker";

import StudyTimer from "./components/StudyTimer";
import Navbar from "./components/shared/Navbar";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<StudyTimer />} />
                <Route path="/expenses" element={<ExpenseTracker />} />
                <Route
                    path="*"
                    element={<div className="p-8">404 Not Found</div>}
                />
            </Routes>
        </Router>
    );
}

export default App;
