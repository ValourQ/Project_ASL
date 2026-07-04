import logo from "../../assets/signsync-logo.png";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-left">

                <img
                    src={logo}
                    alt="SignSync Logo"
                    className="footer-logo"
                />

                <div>
                    <h3>SignSync</h3>

                    <p>
                        Making communication accessible for everyone.
                    </p>
                </div>

            </div>

            <div className="footer-right">

                <p>
                    2026 SignSync. Built with care.
                </p>

            </div>

        </footer>
    );
}

export default Footer;