import Button from "./Button";

function ExpenseCard({

    expense,

    onEdit,

    onDelete

}) {

    return (

        <div

            style={{

                border: "1px solid #ddd",

                borderRadius: "16px",

                padding: "24px",

                marginBottom: "20px",

                background: "#ffffff",

                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"

            }}

        >

            <h3>

                {expense.title}

            </h3>

            <p>

                <strong>Amount:</strong> ₹{expense.amount}

            </p>

            <p>

                <strong>Category:</strong> {expense.category}

            </p>

            <p>

                <strong>Description:</strong>{" "}

                {expense.description || "No Description"}

            </p>

            <p>

                <strong>Date:</strong>{" "}

                {new Date(expense.date).toLocaleDateString()}

            </p>

            <div

                style={{

                    display: "flex",

                    gap: "10px",

                    marginTop: "15px"

                }}

            >

                <Button

                    text="Edit"

                    type="button"

                    onClick={() => onEdit(expense)}

                />

                <Button

                    text="Delete"

                    type="button"

                    onClick={() => onDelete(expense._id)}

                />

            </div>

        </div>

    );

}

export default ExpenseCard;