import React from "react";
import { useEffect, useState } from "react";
import api from "../api";
import TransactionCard from "../components/TransactionCard";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = () => {
    api
      .get("/api/transactions/")
      .then((res) => res.data)
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => console.log(error));
  };

  const deleteTransaction = (id) => {
    api
      .delete(`/api/transactions/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Transaction deleted");
        } else {
          alert("Transaction not deleted");
        }
      })
      .catch((error) => console.log(error));
    getTransactions();
  };

  const createTransaction = (e) => {
    e.preventDefault();
    api
      .post("/api/transactions/", {
        title: title,
        amount: amount,
        category: category,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Transaction created");
        } else {
          alert("Transaction not created");
        }
      })
      .catch((error) => console.log(error));
    getTransactions();
  };

  return (
    <div className="container my-5 row">
      <div className="col-6">
        <h2>Notes</h2>
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
          />
        ))}
      </div>

      <div className="col-6 my-5">
        <form onSubmit={createTransaction} className="my-5 p-5 card">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Deposit">Deposit</option>
              <option value="Withdrawal">Withdrawal</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
