// import { useEffect, useState } from "react";
import UseServices from "../../../Hooks/UseServices";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const services = UseServices()
    
    // const [services, setServices] = useState([])


    // useEffect(()=>{
    //     fetch('https://car-doctor-server-58-59-60.vercel.app/services')
    //     .then(res => res.json())
    //     .then(data => setServices(data))
    // },[])

    return (
        <div>
            <div className="text-center space-y-5">
                <h3 className="text-[#FF3811]">Service{services.length}</h3>
                <h1 className="text-5xl font-bold">Our Service Area</h1>
                <p className="">The majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;