import { useState, useRef, useEffect } from "react";
import styles from "./SelectTimeRange.module.css"; // Импортируйте CSS модуль

const optionsMap = {
  priceChange1h: "1h",
  priceChange1d: "24h",
  priceChange1w: "1w",
};

const SelectTimeRange = ({ selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelect} ref={selectRef}>
      <button className={styles.selectBtn} onClick={toggleOpen}>
        {optionsMap[selectedOption] || "Select"}
      </button>
      {isOpen && (
        <div className={styles.selectOptions}>
          {Object.entries(optionsMap).map(([value, label]) => (
            <div
              key={value}
              className={styles.selectOption}
              onClick={() => handleOptionClick(value)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectTimeRange;
