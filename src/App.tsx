import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExpenseTracker from "./components/ExpenseTracker";
import StudyTimer from "./components/StudyTimer";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<StudyTimer />} />
                    <Route path="/expenses" element={<ExpenseTracker />} />
                    {/* <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/add" element={<AddInventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/add" element={<AddSale />} /> */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
