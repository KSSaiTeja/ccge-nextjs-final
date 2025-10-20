import { all_events } from "@/data/event-data";
import EventBreadcrumb from "../_components/event-breadcrumb";
import EventDetailsArea from "../_components/event-details-area";

type Props = {
  params: { id: string };
};

export function generateMetadata({ params }: Props) {
  const id = params.id;
  const event = all_events.find((item) => item.id == Number(id));
  return {
    title: event?.title,
  };
}

export default function EventDetailsPage({ params }: Props) {
  const event = all_events.find((item) => item.id == Number(params.id));
  return (
    <main>
      {event ? (
        <>
          {/* breadcrumb area start */}
          <EventBreadcrumb event={event} />
          {/* breadcrumb area end */}

          {/* event details area start */}
          <EventDetailsArea event={event} />
          {/* event details area end */}
        </>
      ) : (
        <div className="text-center mt-100 mb-80">
          No Event found with id: {params.id}
        </div>
      )}
    </main>
  );
}
