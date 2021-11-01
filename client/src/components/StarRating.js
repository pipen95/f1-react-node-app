import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export const StarRating = ({ handleChange }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(10)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              className="star_input"
              value={!ratingValue ? 0 : ratingValue}
              onClick={(e) => {
                setRating(ratingValue);
                return handleChange(e);
              }}
            />
            <FaStar
              size={30}
              className="star mr-1 mt-2"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
