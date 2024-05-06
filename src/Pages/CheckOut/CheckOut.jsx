import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckOut = () => {
    const {user} = useContext(AuthContext)
  const service = useLoaderData();
  const { _id, img, title, price } = service;

  const handleBookService = (e) =>{
    e.preventDefault()
    const form= e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;

    const booking = {
        customerName: name,
        email: email,
        img:img,
        date: date,
        service: title,
        service_id: _id,
        price: price
    }

    fetch('https://car-doctor-server-58-59-60.vercel.app/bookings',{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.insertedId){
            alert('service book succefully')
        }
    })
    console.log(booking);
  }

  return (
    <div>
      <h3 className="text-3xl text-center">Book Service : {title}</h3>
      
        <form onSubmit={handleBookService}  className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
             name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              name="date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Amount</span>
            </label>
            <input
              type="text"
              defaultValue={'$'+ price}
              className="input input-bordered"
              required
            />
          </div>
         
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-[#FF3811] text-white btn-block">Order Confirm</button>
          </div>
        </form>
      
    </div>
  );
};

export default CheckOut;
