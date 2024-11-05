import React, { useState, useEffect, useRef } from 'react';
import filterIcon from '../../Assets/Images/Display.svg';
import downIcon from '../../Assets/Images/down.svg';

import './Navbar.css';

export default function Navbar({ groupValue, orderValue, handleGroupValue, handleOrderValue }) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle the display of the filter dropdown
  const toggleFilterDropdown = () => setIsFilterVisible((prev) => !prev);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterVisible(false);
      }
    };

    if (isFilterVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterVisible]);

  // Handle the change of the 'Group by' value (status, user, priority)
  const handleGroupChange = (event) => {
    const selectedValue = event.target.value;
    handleGroupValue(selectedValue); // Update parent component with new grouping value
  };

  // Handle the change of the 'Order by' value (priority, title)
  const handleOrderChange = (event) => {
    const selectedValue = event.target.value;
    handleOrderValue(selectedValue); // Update parent component with new ordering value
  };

  return (
    <section className="nav">
      <div className="nav-container">
        <div>
          <div className="nav-disp-btn" onClick={toggleFilterDropdown}>
            <div className="nav-disp-icon nav-disp-filter">
              <img src={filterIcon} alt="Filter Icon" />
            </div>
            <div className="nav-disp-heading">Display</div>
            <div className="nav-disp-icon nav-disp-drop">
              <img src={downIcon} alt="Dropdown Icon" />
            </div>
          </div>

          <div
            ref={dropdownRef}
            className={isFilterVisible ? 'nav-disp-dropdown nav-disp-dropdown-show' : 'nav-disp-dropdown'}
          >
            <div className="nav-disp-filters">
              <div className="nav-dropdown-category">Grouping</div>
              <div className="nav-dropdown-selector">
                <select value={groupValue} onChange={handleGroupChange} className="nav-selector">
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>

            <div className="nav-disp-filters">
              <div className="nav-dropdown-category">Ordering</div>
              <div className="nav-dropdown-selector">
                <select value={orderValue} onChange={handleOrderChange} className="nav-selector">
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
