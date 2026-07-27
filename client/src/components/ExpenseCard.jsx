function ExpenseCard({ expense }) {

    return (

        <div
            style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px"
            }}
        >

            <h3>{expense.title}</h3>

            <p>₹ {expense.amount}</p>

            <p>{expense.category}</p>

            <p>{expense.description}</p>

            <small>

                {new Date(expense.date).toLocaleDateString()}

            </small>

        </div>

    );

}

export default ExpenseCard;