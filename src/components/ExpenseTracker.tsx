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
        <motion.div
            className="min-h-screen max-w-3xl mx-auto p-6 rounded-xl shadow-md space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                className="text-2xl font-bold text-center text-gray-800"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                💼 My Expense Tracker
            </motion.h1>

            {/* Money Bag Section */}
            <motion.div
                className="bg-gray-100 p-4 rounded-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="text-lg font-semibold mb-2">
                    💰 Add to Money Bag
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="number"
                        placeholder="Amount"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="date"
                        value={addDate}
                        onChange={(e) => setAddDate(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <Button
                        onClick={handleAddMoney}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Add
                    </Button>
                </div>
            </motion.div>

            {/* Expense Section */}
            <motion.div
                className="bg-gray-100 p-4 rounded-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-lg font-semibold mb-2">
                    🧾 Add an Expense
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="number"
                        placeholder="Amount"
                        value={spendAmount}
                        onChange={(e) => setSpendAmount(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="What for?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="date"
                        value={spendDate}
                        onChange={(e) => setSpendDate(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <Button
                        onClick={handleAddExpense}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Spend
                    </Button>
                </div>
            </motion.div>

            {/* Balance Display */}
            <motion.div
                className="text-center text-xl font-semibold text-blue-700"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
            >
                Current Balance: ৳ {balance.toFixed(2)}
            </motion.div>

            {/* Lists */}
            {/* Lists */}
            <motion.div
                className="grid md:grid-cols-2 gap-4"
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
                    <h3 className="text-lg font-bold mb-2">📥 Money Added</h3>
                    <ul className="space-y-1">
                        <AnimatePresence>
                            {moneyBag
                                .slice()
                                .reverse()
                                .map((entry) => (
                                    <motion.li
                                        key={entry.id}
                                        className="border p-2 rounded bg-green-50"
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
                    <h3 className="text-lg font-bold mb-2">📤 Expenses</h3>
                    <ul className="space-y-1">
                        <AnimatePresence>
                            {expenses
                                .slice()
                                .reverse()
                                .map((entry) => (
                                    <motion.li
                                        key={entry.id}
                                        className="border p-2 rounded bg-red-50"
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
    );
}
