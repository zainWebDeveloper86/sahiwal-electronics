// // import React, { useEffect } from "react";
// // import styles from "../../styles/styles.js";
// // import EventCard from "./EventCard.jsx";
// // import { getAllEvents } from "../../redux/actions/event.js";
// // import { useDispatch, useSelector } from "react-redux";

// // const Events = () => {
// //   const dispatch = useDispatch();
// //   const { allEvents } = useSelector((state) => state.events);

// //   useEffect(() => {
// //     dispatch(getAllEvents());
// //   }, [dispatch]);

// //   return (
// //     <div>
// //       <div className={`${styles.section}`}>
// //         <div className={`${styles.heading}`}>
// //           <h1>Popular Events</h1>
// //         </div>

// //         <div className="w-full grid">
// //           {allEvents && allEvents[0] && (
// //             <EventCard data={allEvents[0]} active={true} />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Events;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styles from "../../styles/styles.js";
// import EventCard from "./EventCard.jsx";
// import { getAllEvents } from "../../redux/actions/event.js";

// const Events = () => {
//   const dispatch = useDispatch();
//   const { allEvents, loading } = useSelector((state) => state.events);
//   const [expiredIds, setExpiredIds] = useState([]);

//   useEffect(() => {
//     dispatch(getAllEvents());
//   }, [dispatch]);

//   const handleExpire = (id) => {
//     setExpiredIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
//   };

//   // Filter out events whose countdown has already hit zero,
//   // even though the backend record may still exist until a seller cleans it up.
//   const visibleEvents =
//     allEvents?.filter((event) => !expiredIds.includes(event._id)) || [];

//   if (loading) {
//     return (
//       <div
//         className={`${styles.section} min-h-[60vh] flex items-center justify-center`}
//       >
//         <p className="text-gray-500 text-lg">Loading events...</p>
//       </div>
//     );
//   }

//   if (visibleEvents.length === 0) {
//     return (
//       <div className={`${styles.section}`}>
//         <div className={`${styles.heading}`}>
//           <h1>Popular Events</h1>
//         </div>
//         <div className="w-full grid place-items-center py-20">
//           <h4 className="text-gray-500 text-xl">No Events have!</h4>
//           <p className="text-gray-400 text-sm mt-2">
//             Stay tuned for upcoming events.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className={`${styles.section}`}>
//         <div className={`${styles.heading}`}>
//           <h1>Popular Events</h1>
//         </div>
//         <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {visibleEvents.map((event) => (
//             <EventCard
//               key={event._id}
//               data={event}
//               active={true}
//               onExpire={handleExpire}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles.js";
import EventCard from "./EventCard.jsx";
import { getAllEvents } from "../../redux/actions/event.js";
import Loader from "../Common/Loader.jsx";

const Events = () => {
  const dispatch = useDispatch();
  const { allEvents, loading } = useSelector((state) => state.events);
  const [expiredIds, setExpiredIds] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleExpire = (id) => {
    if (!expiredIds.includes(id)) {
      setExpiredIds((prev) => [...prev, id]);
    }
  };

  const visibleEvents = allEvents?.filter(
    (event) => !expiredIds.includes(event._id)
  ) || [];

  if (loading) {
    return (
      <div className={`${styles.section} min-h-[60vh] flex items-center justify-center`}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>

      {visibleEvents.length === 0 ? (
        <div className="w-full grid place-items-center py-20">
          <h4 className="text-gray-500 text-xl">No Events have!</h4>
          <p className="text-gray-400 text-sm mt-2">
            Stay tuned for upcoming events.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleEvents.map((event) => (
            <EventCard
              key={event._id}
              data={event}
              active={true}
              onExpire={handleExpire}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
