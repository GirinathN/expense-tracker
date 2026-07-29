function DashboardCard({ title, value }) {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                minWidth: "180px",
                textAlign: "center",
                backgroundColor: "#f8f8f8"
            }}
        >

            <h3>{title}</h3>

            <h2>{value}</h2>

        </div>

    );

}

export default DashboardCard;