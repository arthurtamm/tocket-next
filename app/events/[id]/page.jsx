import EventForm from "@components/EventForm";

const Event = async ( { params } ) => {

  return (
    <div>
        <EventForm eventId={params.id}/>
    </div>
  )
}

export default Event;