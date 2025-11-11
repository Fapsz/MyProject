import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Room() {
  const [roomModal, setRoomModal] = useState({
    open: false,
    img: "",
    title: "",
    desc: "",
    price: "",
  });

  const [roomSliderIndex, setRoomSliderIndex] = useState({
    standard: 0,
    deluxe: 0,
    suite: 0,
    family: 0,
    executive: 0,
    presidential: 0,
    luxury: 0,
    penthouse: 0,
    apartment: 0, // ✅ new room index
  });

  const navigate = useNavigate();

  // Example images for each room type
  const roomImageSets = {
    standard: ["/pexels-100.jpg", "/pexels-101.jpg", "/pexels-102.jpg"],
    deluxe: ["/pexels-200.jpg", "/pexels-201.jpg", "/pexels-202.jpg"],
    suite: ["/pexels-600.jpg", "/pexels-601.jpg", "/pexels-602.jpg"],
    family: ["/pexels-300.jpg", "/pexels-301.jpg", "/pexels-302.jpg"],
    executive: ["/pexels-400.jpg", "/pexels-401.jpg", "/pexels-402.jpg"],
    presidential: ["/pexels-500.jpg", "/pexels-501.jpg", "/pexels-502.jpg"],
    luxury: ["/pexels-700.jpg", "/pexels-701.jpg", "/pexels-702.jpg"],
    penthouse: ["/pexels-800.jpg", "/pexels-801.jpg", "/pexels-802.jpg"],

    // ✅ new room images
    apartment: ["/pexels-900.jpg", "/pexels-901.jpg", "/pexels-902.jpg"],
  };

  const roomDetails = {
    standard: {
      title: "Standard Room",
      desc: "Cozy and comfortable, perfect for solo travelers or couples.",
      price: "$35/perNight",
    },
    deluxe: {
      title: "Deluxe Room",
      desc: "Spacious and elegant, with premium amenities and a beautiful view.",
      price: "$40/perNight",
    },
    suite: {
      title: "Suite",
      desc: "Ultimate luxury and space, ideal for families or VIP guests.",
      price: "$70/perNight",
    },
    family: {
      title: "Family Room",
      desc: "Perfect for families, offering extra space and comfort.",
      price: "$55/perNight",
    },
    executive: {
      title: "Executive Room",
      desc: "Designed for business travelers with work-friendly amenities.",
      price: "$60/perNight",
    },
    presidential: {
      title: "Presidential Suite",
      desc: "Top-tier luxury with premium services for distinguished guests.",
      price: "$120/perNight",
    },
    luxury: {
      title: "Luxury Room",
      desc: "Stylish design with premium decor and exclusive amenities.",
      price: "$80/perNight",
    },
    penthouse: {
      title: "Penthouse Suite",
      desc: "The ultimate dream stay with panoramic views and 5-star facilities.",
      price: "$150/perNight",
    },
    // ✅ new room details
    apartment: {
      title: "Apartment Suite",
      desc: "An extraordinary blend of elegance and luxury fit for royalty.",
      price: "$200/perNight",
    },
  };

  // 🔄 Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRoomSliderIndex((prev) => {
        const updated = {};
        for (let key in prev) {
          updated[key] = (prev[key] + 1) % roomImageSets[key].length;
        }
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderRoomCard = (key) => (
    <div
      key={key}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
    >
      {/* Image Slider */}
      <div className="relative w-full h-56" style={{backgroundImage:'url(pexels-100.jpg)'}}>
        <img
          src={roomImageSets[key][roomSliderIndex[key]]}
          alt={roomDetails[key].title}
          className="w-full h-full object-cover"
        />
        {/* Arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-sky-200"
          onClick={() =>
            setRoomSliderIndex((idx) => ({
              ...idx,
              [key]:
                (idx[key] - 1 + roomImageSets[key].length) %
                roomImageSets[key].length,
            }))
          }
        >
          &#8592;
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-sky-200"
          onClick={() =>
            setRoomSliderIndex((idx) => ({
              ...idx,
              [key]: (idx[key] + 1) % roomImageSets[key].length,
            }))
          }
        >
          &#8594;
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-sky-700 mb-2">
          {roomDetails[key].title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {roomDetails[key].desc}
        </p>
        <h6 className="text-green-600 font-bold text-2xl">
          {roomDetails[key].price}
        </h6>

        <div className="flex gap-3 mt-4">
          <button
            className="bg-sky-600 text-white px-4 py-2 rounded font-bold hover:bg-sky-700 transition"
            onClick={() => navigate("/booking")}
          >
            Book Now
          </button>
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-bold hover:bg-gray-300 transition"
            onClick={() =>
              setRoomModal({
                open: true,
                img: roomImageSets[key][roomSliderIndex[key]],
                title: roomDetails[key].title,
                desc: roomDetails[key].desc,
                price: roomDetails[key].price,
              })
            }
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4 bg-gray-100 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Rooms
        </h2>

        {/* Grid of Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Object.keys(roomDetails).map((key) => renderRoomCard(key))}
        </div>
      </section>

      {/* ✅ Room Details Modal */}
      {roomModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" style={{backgroundImage:'url(pexels-1.jpg)'}}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={() =>
                setRoomModal({
                  open: false,
                  img: "",
                  title: "",
                  desc: "",
                  price: "",
                })
              }
            >
              &times;
            </button>
            <img
              src={roomModal.img}
              alt={roomModal.title}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-bold text-sky-700 mb-2 text-center">
              {roomModal.title}
            </h3>
            <p className="text-gray-700 text-center mb-2">{roomModal.desc}</p>
            <div className="text-xl font-bold text-green-600 text-center mb-4">
              {roomModal.price}
            </div>
            <button
              className="w-full bg-sky-600 text-white py-2 rounded font-bold hover:bg-sky-700 transition"
              onClick={() => navigate("/booking")}
            >
              Book This Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
