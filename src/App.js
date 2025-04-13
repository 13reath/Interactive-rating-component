// App.js
import { useState, useEffect } from "react";

export default function App() {
  const [rating, setRating] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="app-container">
      {!isSubmitted ? (
        <RatingCard
          rating={rating}
          setRating={setRating}
          onSubmit={() => rating && setIsSubmitted(true)}
        />
      ) : (
        <ThankYouCard rating={rating} onClose={() => setIsSubmitted(false)} />
      )}
    </div>
  );
}

// components/RatingCard.jsx
function RatingCard({ rating, setRating, onSubmit }) {
  return (
    <div className="card rating-card">
      <StarIcon />
      <Title>How did we do?</Title>
      <Description>
        Please let us know how we did with your support request. All feedback is
        appreciated to help us improve our offering!
      </Description>
      <RatingButtons rating={rating} setRating={setRating} />
      <SubmitButton onSubmit={onSubmit} disabled={!rating} />
    </div>
  );
}

const StarIcon = () => (
  <div className="star-icon">
    <img src="/images/icon-star.svg" alt="Star" />
  </div>
);

const Title = ({ children }) => <h1 className="title">{children}</h1>;

const Description = ({ children }) => <p className="description">{children}</p>;

const RatingButtons = ({ rating, setRating }) => (
  <div className="rating-buttons">
    {[1, 2, 3, 4, 5].map((num) => (
      <button
        key={num}
        className={`rating-btn ${rating === num ? "active" : ""}`}
        onClick={() => setRating(num)}
      >
        {num}
      </button>
    ))}
  </div>
);

const SubmitButton = ({ onSubmit, disabled }) => (
  <button className="submit-btn" onClick={onSubmit} disabled={disabled}>
    SUBMIT
  </button>
);

function ThankYouCard({ rating, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="card thank-you-card">
      <ThankYouImage />
      <SelectedRating rating={rating} />
      <Title>Thank you!</Title>
      <Description>
        We appreciate you taking the time to give a rating.
        <br />
        If you ever need more support, don't hesitate to get in touch!
      </Description>
      <CloseButton onClose={onClose} />
    </div>
  );
}

const ThankYouImage = () => (
  <img
    src="/images/illustration-thank-you.svg"
    alt="Thank you"
    className="thank-you-image"
  />
);

const SelectedRating = ({ rating }) => (
  <div className="selected-rating">You selected {rating} out of 5</div>
);

const CloseButton = ({ onClose }) => (
  <button className="close-btn" onClick={onClose} aria-label="Close">
    ×
  </button>
);
