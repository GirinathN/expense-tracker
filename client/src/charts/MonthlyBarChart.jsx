import {

    ResponsiveContainer,

    BarChart,

    Bar,

    CartesianGrid,

    XAxis,

    YAxis,

    Tooltip

} from "recharts";

function MonthlyBarChart({ expenses }) {

    const months = [

        "Jan",

        "Feb",

        "Mar",

        "Apr",

        "May",

        "Jun",

        "Jul",

        "Aug",

        "Sep",

        "Oct",

        "Nov",

        "Dec"

    ];

    const monthlyData = months.map((month, index) => {

        const total = expenses

            .filter((expense) => {

                const date = new Date(expense.date);

                return (

                    expense.category !== "Salary"

                    &&

                    date.getMonth() === index

                );

            })

            .reduce(

                (sum, expense) =>

                    sum + expense.amount,

                0

            );

        return {

            month,

            amount: total

        };

    });

    return (

        <div

            style={{

                width: "100%",

                height: "350px"

            }}

        >

            <ResponsiveContainer>

                <BarChart

                    data={monthlyData}

                >

                    <CartesianGrid

                        strokeDasharray="3 3"

                    />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar

                        dataKey="amount"

                        fill="#4CAF50"

                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default MonthlyBarChart;