function Button({
    text,
    loading,
    type = "button"
}) {

    return (

        <button
            type={type}
            disabled={loading}
        >

            {loading ? "Please Wait..." : text}

        </button>

    );

}

export default Button;