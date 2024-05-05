import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Booking from "./Booking";
import axios from "axios";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  useEffect(() => {

   axios.get(url, {withCredentials: true})
   .then(res => {
    // console.log(res.data);
    setBookings(res.data)
   })

    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     setBookings(data);
    //   });
  }, [url]);
  // console.log(bookings);
  const handleDelete = id =>{
    
    const procced = confirm('are you sure you want to delete')

    if(procced){
        fetch(`http://localhost:5000/bookings/${id}`,{
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
        fetch(`http://localhost:5000/bookings/${id}`,{
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
