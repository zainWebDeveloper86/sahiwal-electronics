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

  const visibleEvents =
    allEvents?.filter((event) => !expiredIds.includes(event._id)) || [];

  if (loading) {
    return (
      <div
        className={`${styles.section} min-h-[60vh] flex items-center justify-center`}
      >
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
          <h4 className="text-ink/60 text-xl font-display">No events right now</h4>
          <p className="text-ink/40 text-sm mt-2 font-body">
            Stay tuned for upcoming deals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
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