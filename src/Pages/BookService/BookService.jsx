import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { data } from "autoprefixer";

const BookService = () => {
    const service = useLoaderData();
    const { title, _id, price, img } = service;
    const {user} = useContext(AuthContext);

    const handleBookService = event =>{
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const amount = form.amount.value;
        const message = form.message.value;
        const booking = {
            customerName: name,   
            email,
            img,
            date,
            amount,
            message,
            service:title,
            service_id: _id,
            price: price

        }
        console.log(booking);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(date => {
            console.log(date);
            if(data.insertedId){
                alert('service book successfully')
            }
        })
    }
    return (
        <div>
            <h2 className=" text-center text-3xl font-bold">Book Service: {title}</h2>

            <form onSubmit={handleBookService} className="card-body">
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Name" defaultValue={user?.displayName} className="input input-bordered" required />
                    </div>
                    

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="Email" name="email" defaultValue={user?.email} className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" name="amount" defaultValue={'$' + price} className="input input-bordered" required />

                    </div>

                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Message</span>
                    </label>
                    <input type="text" name="message" placeholder="Your Message" className="input input-bordered" required />

                </div>

                <div className="form-control mt-6">
                    <input className=" btn btn-primary btn-block" type="submit" value="Order Confirm" />

                </div>
            </form>
        </div>
    );
};

export default BookService;