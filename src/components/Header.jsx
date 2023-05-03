import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";

function Header({ theme, toggleTheme }) {
  const animationProps = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 5 },
    transition: { duration: 0.1 },
  };

  return (
    <header>
      <div className="header-container">
        <h1>TODO</h1>
        <button
          className={`btn-theme ${theme}`}
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          <span className="btn-theme__text">Switch theme</span>
          <AnimatePresence mode="wait">
            {theme === "dark" && (
              <motion.img
                key="sun"
                src={sun}
                className="icon-theme"
                alt="Light theme"
                {...animationProps}
              />
            )}
            {theme === "light" && (
              <motion.img
                key="moon"
                src={moon}
                className="icon-theme"
                alt="Dark theme"
                {...animationProps}
              />
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Header;
