import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Booking from "./Booking";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const axiosSecure = UseAxiosSecure()
  const url = `/bookings?email=${user?.email}`

  useEffect(() => {

      axiosSecure.get(url)
      .then(res => setBookings(res.data))

  
    // fetch(url, {credentials: "include"})
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     setBookings(data);
    //   });
  }, [url, axiosSecure]);
  // console.log(bookings);
  const handleDelete = id =>{
    
    const procced = confirm('are you sure you want to delete')

    if(procced){
        fetch(`https://car-doctor-server-58-59-60.vercel.app/bookings/${id}`,{
        method: 'DELETE'
    })
    .then(res=>res.json())
    .then(data=> {
        console.log(data)
        if(data.deletedCount > 0){
            alert('deleted succfully')
            const remaining = bookings.filter(book => book._id !== id)
            setBookings(remaining)
        }
    })
       
    }
    
}

    const handleBookingUpdate = id =>{
        fetch(`https://car-doctor-server-58-59-60.vercel.app/bookings/${id}`,{
        method: 'PATCH',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({status: 'confirm'})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.modifiedCount > 0){
            alert('modified')
            const remaining = bookings.filter(book => book._id !== id)
            const updated = bookings.find(book => book._id === id)
            updated.status = 'confirm'
            const newBookings = [updated, ...remaining]
            setBookings(newBookings)

        }
    })
    }

  // console.log(bookings);
  return (
    <div>
      <h3 className="text-6xl">Your Bookings: {bookings.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Service</th>
              <th>Taking Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {
            bookings.map(booking=> <Booking key={booking._id} booking={booking} handleDelete={handleDelete}  handleBookingUpdate={handleBookingUpdate}></Booking>)
          }
           
          </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default Bookings;
