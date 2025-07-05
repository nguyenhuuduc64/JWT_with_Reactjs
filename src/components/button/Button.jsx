function Button({ name, styles, onClick }) {
    return (
        <button style={styles} onClick={onClick}>
            {name}
        </button>
    );
}

export default Button;
