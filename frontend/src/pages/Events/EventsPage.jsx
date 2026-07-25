import React, { useEffect, useState } from "react";
import EventCard from "../../components/Events/EventCard.jsx";
import Loader from "../../components/Common/Loader.jsx";
import { getAllEvents } from "../../redux/actions/event.js";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles.js";

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

  const visibleEvents =
    allEvents?.filter((event) => !expiredIds.includes(event._id)) || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className={`${styles.section} py-8`}>
      <h1 className={`${styles.heading} text-center`}>All Events</h1>
      {visibleEvents.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-display text-ink/50">No events right now</h2>
          <p className="text-ink/40 font-body mt-2">Check back later for new deals.</p>
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