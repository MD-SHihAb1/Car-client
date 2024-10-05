import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";


const BookService = () => {

    const service = useLoaderData();
    const { title, _id , price, img} = service;
    const {user} = useContext(AuthContext);


    const handleBookService = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking  = {
          customerName: name,
          email,
          img,
          date,
          service: title,
          service_id: _id,
          price: price

        }

        console.log(booking)

        fetch('http://localhost:5100/bookings', {
          method: 'POST',
          headers: {
            'content-type':'application/json'
          },
          body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.insertedId){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Booking Added",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
    }






  return (
    <div>
      <div>
        <h2 className="text-center text-4xl">book service: {title}</h2>

        <form onSubmit={handleBookService} className="card-body">
          <div className="grid grid-col-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                name="name"
                defaultValue={user?.displayName}
                placeholder="Name"
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
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Amount</span>
              </label>
              <input
                
                defaultValue={'$' + price}
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <input
              className="btn btn-block"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookService;
