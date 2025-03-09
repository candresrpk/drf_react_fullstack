import React from "react";

const TransactionCard = ({ transaction, deleteTransaction }) => {
  const formattedDate = new Date(transaction.timestamp).toLocaleString("es-CO");

  return (
    <div className="card my-5">
      <div className="card-body">
        <h5 className="card-title">{transaction.title}</h5>
        <p className="card-text">Amount: {transaction.amount}</p>
        <p className="card-text">Category: {transaction.category}</p>
        <p className="card-text">Category: {formattedDate}</p>

        <button
          className="btn btn-danger"
          onClick={() => deleteTransaction(transaction.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
