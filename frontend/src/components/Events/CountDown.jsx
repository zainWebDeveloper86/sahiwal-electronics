// // // import React, { useEffect, useState } from "react";

// // // const CountDown = () => {
// // //   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

// // //   useEffect(() => {
// // //     const timer = setTimeout(() => {
// // //       setTimeLeft(calculateTimeLeft());
// // //     }, 1000);

// // //     return () => clearTimeout(timer);
// // //   });

// // //   function calculateTimeLeft() {
// // //     const difference = +new Date('2026-07-02') - +new Date();
// // //     let timeLeft = {};

// // //     if (difference > 0) {
// // //       timeLeft = {
// // //         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
// // //         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
// // //         minutes: Math.floor((difference / 1000 / 60) % 60),
// // //         seconds: Math.floor((difference / 1000) % 60),
// // //       };
// // //     }

// // //     return timeLeft;
// // //   }

// // //   const timerComponents = Object.keys(timeLeft).map((interval) => {
// // //     if (!timeLeft[interval]) {
// // //       return null;
// // //     }

// // //     return (
// // //       <span className="text-[25px] text-[#475ad2]">
// // //         {timeLeft[interval]} {interval}{" "}
// // //       </span>
// // //     );
// // //   });

// // //   return (
// // //     <div>
// // //       {timerComponents.length ? (
// // //         timerComponents
// // //       ) : (
// // //         <span className="text-[red] text-[25px]">Time's Up</span>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default CountDown;

// // import React, { useEffect, useState } from "react";

// // const CountDown = ({ data }) => {
// //   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setTimeLeft(calculateTimeLeft());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, [data]);

// //   function calculateTimeLeft() {
// //     const difference = +new Date(data?.Finish_Date) - +new Date();   // 👈 event ki apni end date
// //     let timeLeft = {};

// //     if (difference > 0) {
// //       timeLeft = {
// //         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
// //         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
// //         minutes: Math.floor((difference / 1000 / 60) % 60),
// //         seconds: Math.floor((difference / 1000) % 60),
// //       };
// //     }

// //     return timeLeft;
// //   }

// //   const timerComponents = Object.keys(timeLeft).map((interval) => {
// //     if (!timeLeft[interval]) return null;

// //     return (
// //       <span className="text-[25px] text-[#475ad2]" key={interval}>
// //         {timeLeft[interval]} {interval}{" "}
// //       </span>
// //     );
// //   });

// //   return (
// //     <div>
// //       {timerComponents.length ? timerComponents : (
// //         <span className="text-[red] text-[25px]">Time's Up</span>
// //       )}
// //     </div>
// //   );
// // };

// // export default CountDown;

// import React, { useEffect, useState } from "react";

// const CountDown = ({ data, onExpire }) => {
//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const updated = calculateTimeLeft();
//       setTimeLeft(updated);

//       const isExpired =
//         typeof updated.days === "undefined" &&
//         typeof updated.hours === "undefined" &&
//         typeof updated.minutes === "undefined" &&
//         typeof updated.seconds === "undefined";

//       // Just notify the parent that this event has expired.
//       // No delete call here — a regular customer viewing this page
//       // has no seller permission to delete anything.
//       if (isExpired && onExpire) {
//         onExpire(data._id);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [data]);

//   function calculateTimeLeft() {
//     if (!data?.Finish_Date) return {};
//     const difference = +new Date(data.Finish_Date) - +new Date();
//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }

//     return timeLeft;
//   }

//   const timerComponents = Object.keys(timeLeft).map((interval) => {
//     if (!timeLeft[interval]) return null;
//     return (
//       <span className="text-[25px] text-[#475ad2]" key={interval}>
//         {timeLeft[interval]} {interval}{" "}
//       </span>
//     );
//   });

//   return (
//     <div>
//       {timerComponents.length ? timerComponents : (
//         <span className="text-[red] text-[25px]">Time's Up</span>
//       )}
//     </div>
//   );
// };

// export default CountDown;

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
      <span className="text-base font-medium text-[#475ad2]" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="flex items-center justify-center gap-1">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-red-500 font-semibold">Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;