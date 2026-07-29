import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer

} from "recharts";

const COLORS = [

    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
    "#775DD0",
    "#4CAF50"

];

function ExpensePieChart({ categorySummary }) {

    const data = Object.entries(categorySummary).map(

        ([category, amount]) => ({

            name: category,

            value: amount

        })

    );

    return (

        <div
            style={{
                width: "100%",
                height: "350px"
            }}
        >

            <ResponsiveContainer>

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="value"

                        nameKey="name"

                        outerRadius={120}

                        label

                    >

                        {

                            data.map((entry, index) => (

                                <Cell

                                    key={index}

                                    fill={

                                        COLORS[

                                            index % COLORS.length

                                        ]

                                    }

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ExpensePieChart;