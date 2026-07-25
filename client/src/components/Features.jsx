import "../styles/features.css";

function Features() {
    return (
        <section className="features">
            <h2>Features</h2>

            <div className="feature-grid">

                <div className="feature-card">
                    <h3>Track Expenses</h3>
                    <p>Record every transaction easily.</p>
                </div>

                <div className="feature-card">
                    <h3>Visual Analytics</h3>
                    <p>Understand your spending with charts.</p>
                </div>

                <div className="feature-card">
                    <h3>Secure Account</h3>
                    <p>Your financial data is protected.</p>
                </div>

            </div>
        </section>
    );
}

export default Features;