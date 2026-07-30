function DashboardCard({ title, value }) {

    return (

        <div

            style={{

                background: "#ffffff",

                borderRadius: "16px",

                padding: "20px",

                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",

                textAlign: "center"

            }}

        >

            <h3>

                {title}

            </h3>

            <h1>

                {value}

            </h1>

        </div>

    );

}

export default DashboardCard;