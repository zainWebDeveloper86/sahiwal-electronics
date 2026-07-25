import React, { useEffect, useState } from "react";

const CountDown = ({ data, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      const isExpired =
        typeof updated.days === "undefined" &&
        typeof updated.hours === "undefined" &&
        typeof updated.minutes === "undefined" &&
        typeof updated.seconds === "undefined";

      if (isExpired && onExpire) {
        onExpire(data._id);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  function calculateTimeLeft() {
    if (!data?.Finish_Date) return {};
    const difference = +new Date(data.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) return null;
    return (
      <span className="font-mono text-sm font-[600] text-voltage" key={interval}>
        {timeLeft[interval]}{interval.charAt(0)}{" "}
      </span>
    );
  });

  return (
    <div className="flex items-center justify-center gap-1">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="font-mono text-sm font-[600] text-copper">Expired</span>
      )}
    </div>
  );
};

export default CountDown;