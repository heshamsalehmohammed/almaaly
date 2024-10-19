import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './HeshamSlider.css';

export const HeshamSliderItem = ({ children, isActive }) => {
  return (
    <div className={`hesham-slider-item ${isActive ? "active" : ""}`}>
      {children}
    </div>
  );
};

HeshamSliderItem.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
};

HeshamSliderItem.defaultProps = {
  isActive: false,
};

export const HeshamSlider = ({ children, gap,itemWidth }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayItems, setDisplayItems] = useState([]);
  const sliderRef = useRef(null);
  const itemRef = useRef(null);
  const [itemsToDuplicate, setItemsToDuplicate] = useState(0);

  useEffect(() => {
    if (children && children.length > 0) {
      const items = [...children];
      const containerWidth = sliderRef.current ? sliderRef.current.offsetWidth : 0;

      if (itemWidth && containerWidth) {
        // Calculate the number of items to duplicate based on the width of the container and the item
        const totalItemWidth = itemWidth + gap;
        const duplicateCount = Math.ceil(containerWidth / totalItemWidth);

        setItemsToDuplicate(duplicateCount);

        const duplicates = [];
        for (let i = items.length - 1; i >= items.length - duplicateCount; i--) {
          if (i >= 0) duplicates.push(items[i]);
        }

        setDisplayItems([...duplicates, ...items]);
      }
    }
  }, [children, gap]);

  return (
    <div className="hesham-slider-container" ref={sliderRef}>
      <div
        className="hesham-slider-track"
        style={{
          gap: `${gap}px`,
          transform: `translateX(-${(itemsToDuplicate + activeIndex) * (100 + gap)}%)`,
        }}
      >
        {displayItems.map((child, index) => (
          <HeshamSliderItem
            key={index}
            isActive={index === activeIndex + itemsToDuplicate} // Adjust for duplicated items
          >
            <div ref={itemRef}>
              {child}
            </div>
          </HeshamSliderItem>
        ))}
      </div>
    </div>
  );
};

HeshamSlider.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.number,
  itemWidth:PropTypes.number
};

HeshamSlider.defaultProps = {
  gap: 20, // Default gap between items in pixels
  itemWidth:320
};
