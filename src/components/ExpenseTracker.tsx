"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Entry = {
    id: string;
    amount: number;
    date: string;
    description?: string;
};

const LOCAL_STORAGE_MONEY_KEY = "focusTrack_moneyBag";
const LOCAL_STORAGE_EXPENSE_KEY = "focusTrack_expenses";

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
};

export default function ExpenseTracker() {
    const [moneyBag, setMoneyBag] = useState<Entry[]>(() => {
        const stored = localStorage.getItem("focusTrack_moneyBag");
        return stored ? JSON.parse(stored) : [];
    });

    const [expenses, setExpenses] = useState<Entry[]>(() => {
        const stored = localStorage.getItem("focusTrack_expenses");
        return stored ? JSON.parse(stored) : [];
    });

    const [addAmount, setAddAmount] = useState("");
    const [addDate, setAddDate] = useState(
        () => new Date().toISOString().split("T")[0]
    );

    const [spendAmount, setSpendAmount] = useState("");
    const [spendDate, setSpendDate] = useState(
        () => new Date().toISOString().split("T")[0]
    );
    const [description, setDescription] = useState("");

    const totalIn = moneyBag.reduce((sum, entry) => sum + entry.amount, 0);
    const totalOut = expenses.reduce((sum, entry) => sum + entry.amount, 0);
    const balance = totalIn - totalOut;

    useEffect(() => {
        const savedMoney = localStorage.getItem(LOCAL_STORAGE_MONEY_KEY);
        const savedExpenses = localStorage.getItem(LOCAL_STORAGE_EXPENSE_KEY);
        if (savedMoney) setMoneyBag(JSON.parse(savedMoney));
        if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_MONEY_KEY, JSON.stringify(moneyBag));
    }, [moneyBag]);

    useEffect(() => {
        localStorage.setItem(
            LOCAL_STORAGE_EXPENSE_KEY,
            JSON.stringify(expenses)
        );
    }, [expenses]);

    const handleAddMoney = () => {
        if (!addAmount) return;
        const newEntry: Entry = {
            id: crypto.randomUUID(),
            amount: parseFloat(addAmount),
            date: addDate,
        };
        setMoneyBag((prev) => [...prev, newEntry]);
        setAddAmount("");
    };

    const handleAddExpense = () => {
        if (!spendAmount || !description) return;
        const newExpense: Entry = {
            id: crypto.randomUUID(),
            amount: parseFloat(spendAmount),
            date: spendDate,
            description,
        };
        setExpenses((prev) => [...prev, newExpense]);
        setSpendAmount("");
        setDescription("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-100 via-fuchsia-50 to-fuchsia-50 p-4">
            <motion.div
                className="w-full max-w-4xl p-6 rounded-2xl shadow-xl bg-white/70 backdrop-blur-md space-y-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-3xl font-bold text-center text-gray-800"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    💼 My Expense Tracker
                </motion.h1>

                {/* Add Money Section */}
                <motion.div
                    className="bg-white border border-green-100 p-6 rounded-xl shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-green-700">
                        💰 Add to Money Bag
                    </h2>
                    <div className="flex flex-col items-center sm:flex-row gap-4">
                        <input
                            type="number"
                            placeholder="Amount"
                            value={addAmount}
                            onChange={(e) => setAddAmount(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-green-300 outline-none"
                        />
                        <input
                            type="date"
                            value={addDate}
                            onChange={(e) => setAddDate(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-green-300 outline-none"
                        />
                        <Button
                            onClick={handleAddMoney}
                            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full transition"
                        >
                            Add
                        </Button>
                    </div>
                </motion.div>

                {/* Add Expense Section */}
                <motion.div
                    className="bg-white border border-red-100 p-6 rounded-xl shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-red-700">
                        🧾 Add an Expense
                    </h2>
                    <div className="flex flex-col items-center sm:flex-row gap-4">
                        <input
                            type="number"
                            placeholder="Amount"
                            value={spendAmount}
                            onChange={(e) => setSpendAmount(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-red-300 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="What for?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-red-300 outline-none"
                        />
                        <input
                            type="date"
                            value={spendDate}
                            onChange={(e) => setSpendDate(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-red-300 outline-none"
                        />
                        <Button
                            onClick={handleAddExpense}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full px-5 py-2.5transition"
                        >
                            Spend
                        </Button>
                    </div>
                </motion.div>

                {/* Balance Display */}
                <motion.div
                    className="text-center text-2xl font-semibold text-indigo-600"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Current Balance: ৳ {balance.toFixed(2)}
                </motion.div>

                {/* Lists */}
                <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                >
                    {/* Money Added List */}
                    <motion.div>
                        <h3 className="text-lg font-bold mb-3 text-green-800">
                            📥 Money Added
                        </h3>
                        <ul className="space-y-2">
                            <AnimatePresence>
                                {moneyBag
                                    .slice()
                                    .reverse()
                                    .map((entry) => (
                                        <motion.li
                                            key={entry.id}
                                            className="border border-green-100 p-3 rounded-md bg-green-50/50 hover:bg-green-100 transition"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            layout
                                        >
                                            ৳ {entry.amount.toFixed(2)} –{" "}
                                            {formatDate(entry.date)}
                                        </motion.li>
                                    ))}
                            </AnimatePresence>
                        </ul>
                    </motion.div>

                    {/* Expense List */}
                    <motion.div>
                        <h3 className="text-lg font-bold mb-3 text-red-800">
                            📤 Expenses
                        </h3>
                        <ul className="space-y-2">
                            <AnimatePresence>
                                {expenses
                                    .slice()
                                    .reverse()
                                    .map((entry) => (
                                        <motion.li
                                            key={entry.id}
                                            className="border border-red-100 p-3 rounded-md bg-red-50/50 hover:bg-red-100 transition"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            layout
                                        >
                                            ৳ {entry.amount.toFixed(2)} –{" "}
                                            {entry.description} –{" "}
                                            {formatDate(entry.date)}
                                        </motion.li>
                                    ))}
                            </AnimatePresence>
                        </ul>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
