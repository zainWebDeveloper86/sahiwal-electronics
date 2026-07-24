// import React, { useEffect } from "react";
// import EventCard from "../../components/Events/EventCard.jsx";
// import Loader from "../../components/Common/Loader.jsx";
// import { getAllEvents } from "../../redux/actions/event.js";
// import { useDispatch, useSelector } from "react-redux";

// const EventsPage = () => {
//   const dispatch = useDispatch();
//   const { allEvents, loading } = useSelector((state) => state.events);

//   useEffect(() => {
//     if (!allEvents) {
//       dispatch(getAllEvents());
//     }
//   }, [dispatch, allEvents]);

//   // console.log(allEvents);

//   return (
//     <>
//       <div>
//         <br />
//         <br />
//         {loading ? (
//           <Loader />
//         ) : allEvents && allEvents.length > 0 ? (
//           allEvents.map((event) => <EventCard data={event} key={event._id} />)
//         ) : (
//           <h1 className="text-center w-full pb-[100px] text-[20px]">
//             No Events Found!
//           </h1>
//         )}
//       </div>
//     </>
//   );
// };

// export default EventsPage;


import React, { useEffect, useState } from "react";
import EventCard from "../../components/Events/EventCard.jsx";
import Loader from "../../components/Common/Loader.jsx";
import { getAllEvents } from "../../redux/actions/event.js";
import { useDispatch, useSelector } from "react-redux";

const EventsPage = () => {
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
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        All Events
      </h1>
      {visibleEvents.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-500">No Events Found!</h2>
          <p className="text-gray-400 mt-2">Check back later for new events.</p>
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

export default EventsPage;