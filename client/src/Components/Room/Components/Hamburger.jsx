// A hamburger button for mobile version of chat.

export const Hamburger = ({isActive, setActive}) => {
    return (
        <button className={`hamburger hamburger--squeeze mobile-only ${isActive ? "is-active" : ""}`} type="button" onClick={setActive}>
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    )
}