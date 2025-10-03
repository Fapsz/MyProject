
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function About() {
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [galleryModal, setGalleryModal] = useState({
    open: false,
    img: "",
    title: "",
    desc: "",
  });
  const [showSuiteDropdown, setShowSuiteDropdown] = useState(false);
  const [suitePriceVisible, setSuitePriceVisible] = useState(null);

  const suiteImages = [
    { src: "/pexels-10.jpg", title: "Presidential Suite", price: "$350/night" },
    { src: "/pexels-8.jpg", title: "Royal Suite", price: "$280/night" },
    { src: "/pexels-2.jpg", title: "Executive Suite", price: "$220/night" },
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* ================= Full Details Modal ================= */}
      {showFullDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
              onClick={() => setShowFullDetails(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold mb-4 text-sky-700 text-center">
              DreamHotel Full Details
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              DreamHotel is a sanctuary of luxury and comfort, designed to
              provide guests with an unforgettable experience. Our hotel
              features elegantly appointed rooms, world-class dining, and a
              dedicated team committed to your satisfaction.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Luxurious rooms and suites with stunning views</li>
              <li>Gourmet restaurants and bars</li>
              <li>Relaxing spa and wellness center</li>
              <li>Modern conference and event facilities</li>
              <li>Prime location near top attractions</li>
              <li>Complimentary high-speed Wi-Fi</li>
              <li>24/7 concierge and room service</li>
            </ul>
            <p className="text-md text-gray-700">
              Welcome to DreamHotel—where dreams become memories.
            </p>
          </div>
        </div>
      )}

      {/* ================= Hero Section ================= */}
      <section className="relative h-[500px] flex items-center justify-center bg-gray-800">
        <img
          src="/pexels-19.jpg"
          alt="Hotel"
          className="absolute w-full h-full object-cover opacity-30 cursor-pointer"
          onClick={() => setShowFullDetails(true)}
        />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Welcome to DreamHotel
          </h2>
          <p className="text-xl text-white mb-6 max-w-2xl mx-auto drop-shadow">
            Discover elegance and tranquility at DreamHotel, where every moment
            is crafted to be unforgettable. Whether for romance, family, or
            business, we promise warmth, exclusivity, and luxury.
          </p>
          <Link to="/booking">
            <button className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-sky-700 transition">
              Book Now
            </button>
          </Link>
        </div>
      </section>

      {/* ================= Gallery Section ================= */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Gallery
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              img: "/pexels-4.jpg",
              title: "Luxury Room",
              desc: "Premium amenities with stunning views.",
            },
            {
              img: "/pexels-6.jpg",
              title: "Elegant Suite",
              desc: "Designed for comfort and style.",
            },
            {
              img: "/pexels-7.jpg",
              title: "Family Room",
              desc: "Perfect for memorable stays with loved ones.",
            },
            {
              img: "/pexels-54.jpg",
              title: "Grand Lobby",
              desc: "Welcomes you with elegance and comfort.",
            },
            {
              img: "/pexels-12.jpg",
              title: "Fine Suite",
              desc: "Gourmet luxury suite for special guests.",
            },
            {
              img: "/pexels-53.jpg",
              title: "Relaxing Pool",
              desc: "Unwind in serene surroundings.",
            },
          ].map((item, idx) => (
            <img
              key={idx}
              src={item.img}
              alt={item.title}
              className="rounded-xl shadow-lg object-cover w-full h-56 transition-transform duration-700 ease-in-out hover:scale-110 cursor-pointer"
              onClick={() =>
                setGalleryModal({
                  open: true,
                  img: item.img,
                  title: item.title,
                  desc: item.desc,
                })
              }
            />
          ))}
        </div>

        {/* Modal */}
        {galleryModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                onClick={() =>
                  setGalleryModal({ open: false, img: "", title: "", desc: "" })
                }
              >
                &times;
              </button>
              <img
                src={galleryModal.img}
                alt={galleryModal.title}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold text-sky-700 mb-2 text-center">
                {galleryModal.title}
              </h3>
              <p className="text-gray-700 text-center">{galleryModal.desc}</p>
            </div>
          </div>
        )}
      </section>

      {/* ================= Features Section ================= */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h4 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Why Choose DreamHotel?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <img
              src="/pexels-42.jpg"
              alt="Luxury Room"
              className="mx-auto mb-4 w-20 h-20 object-cover rounded-full shadow hover:scale-110 transition-transform"
            />
            <h5 className="text-xl font-bold text-sky-500 mb-2">
              Luxury Rooms
            </h5>
            <p className="text-gray-600">
              Spacious, beautifully designed rooms with premium amenities.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center relative">
            <img
              src="/pexels-31.jpg"
              alt="Fine Suite"
              className="mx-auto mb-4 w-20 h-20 object-cover rounded-full shadow hover:scale-110 transition-transform cursor-pointer"
              onClick={() => setShowSuiteDropdown((prev) => !prev)}
            />
            <h5
              className="text-xl font-bold text-sky-500 mb-2 cursor-pointer"
              onClick={() => setShowSuiteDropdown((prev) => !prev)}
            >
              Fine Suite
            </h5>
            <p className="text-gray-600">
              Explore our world-class fine suites with gourmet luxury.
            </p>

            {showSuiteDropdown && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 bg-white rounded-xl shadow-lg p-4 z-20 flex flex-col gap-4 animate-dropdown">
                {suiteImages.map((suite, idx) => (
                  <div key={suite.src} className="relative">
                    <img
                      src={suite.src}
                      alt={suite.title}
                      className="w-full h-24 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSuitePriceVisible(idx)}
                    />
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        suitePriceVisible === idx
                          ? "max-h-20 opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      } bg-gradient-to-r from-green-100 to-blue-100 rounded-lg px-4 py-2 text-center font-bold text-lg shadow-lg`}
                    >
                      {suite.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <img
              src="/pexels-51.jpg"
              alt="Spa & Wellness"
              className="mx-auto mb-4 w-20 h-20 object-cover rounded-full shadow hover:scale-110 transition-transform"
            />
            <h5 className="text-xl font-bold text-sky-500 mb-2">
              Spa & Wellness
            </h5>
            <p className="text-gray-600">
              Relax and rejuvenate with our luxurious spa treatments.
            </p>
          </div>
        </div>
      </section>

      {/* ================= Team Section ================= */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h4 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Meet Our Team
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              name: "John Doe",
              role: "General Manager",
              desc: "Leading the team with passion and excellence for over 10 years.",
              img: "/admin-2.jpg",
            },
            {
              name: "Ayomide Fapohunda",
              role: "Admin Manager",
              desc: "Crafting gourmet experiences and signature dishes.",
              img: "/admin-1.jpg",
            },
            {
              name: "Emily Lee",
              role: "Spa Director",
              desc: "Ensuring relaxation and wellness for every guest.",
              img: "/admin-3.jpg",
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full mb-4 shadow-lg"
              />
              <h5 className="text-lg font-bold text-sky-700 mb-1">
                {member.name}
              </h5>
              <span className="text-gray-500 mb-2">{member.role}</span>
              <p className="text-gray-600 text-center">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;