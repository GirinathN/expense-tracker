function LoadingSpinner() {

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "200px"
            }}
        >

            <div
                style={{
                    width: "50px",
                    height: "50px",
                    border: "5px solid #ddd",
                    borderTop: "5px solid #4CAF50",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                }}
            />

            <h3>Loading Dashboard...</h3>

        </div>

    );

}

export default LoadingSpinner;