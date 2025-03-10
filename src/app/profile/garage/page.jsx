import React from 'react';

const Garage = () => {
  const vehicles = [
    { year: '2011', make: 'Ford', model: 'Focus S', engine: '2.0L 1742DA L4 FI Turbo' },
    { year: '2019', make: 'Audi', model: 'Q7 Premium', engine: '3.0L 5626CC L6 QK' },
    { year: '2015', make: 'Kia', model: 'Rio LX', engine: '1.6L 8306JK L5 RL' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Garage</h2>
      <div className="space-y-4">
        {vehicles.map((vehicle, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-lg bg-white">
            <h3 className="text-lg font-semibold">{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</h3>
            <p className="text-gray-600">Engine: {vehicle.engine}</p>
            <button className="mt-2 text-blue-500 hover:text-blue-700">Show Parts</button>
          </div>
        ))}
        <div className="border border-gray-200 p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold text-gray-700">Add A Vehicle</h3>
          <div className="space-y-2 mt-4">
            <select className="w-full border border-gray-300 p-2 rounded">
              <option>Select Year</option>
              {/* Add more year options here */}
            </select>
            <select className="w-full border border-gray-300 p-2 rounded">
              <option>Select Brand</option>
              {/* Add more brand options here */}
            </select>
            <select className="w-full border border-gray-300 p-2 rounded">
              <option>Select Model</option>
              {/* Add more model options here */}
            </select>
            <select className="w-full border border-gray-300 p-2 rounded">
              <option>Select Engine</option>
              {/* Add more engine options here */}
            </select>
            <div className="text-center mt-4 text-gray-600">Or</div>
            <input
              type="text"
              placeholder="Enter VIN"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Add Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garage;
