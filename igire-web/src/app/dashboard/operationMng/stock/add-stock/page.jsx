"use client"

import { useState } from 'react';

export default function AddStockForm() {
  const [formData, setFormData] = useState({
    name: '',
    idSerialNumber: '',
    image: null,
    brand: '',
    category: '',
    status: '',
    dateOfEntry: '',
    location: '',
    size: '',
    color: '',
    additionalSpecification: '',
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., sending data to the server)
    console.log(formData);
  };

  return (
    <div className="flex justify-center flex-col items-center px-[10rem] min-h-screen  ">
      <p className="text-xl py-4">Fill out new stock details</p>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-md rounded-lg p-6 w-full"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ID/Serial Number</label>
            <input
              type="text"
              name="idSerialNumber"
              value={formData.idSerialNumber}
              onChange={handleInputChange}
              placeholder="ID/Serial Number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="Brand"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Entry</label>
            <input
              type="date"
              name="dateOfEntry"
              value={formData.dateOfEntry}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              placeholder="Size"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              placeholder="Color"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Additional Specification</label>
          <textarea
            name="additionalSpecification"
            value={formData.additionalSpecification}
            onChange={handleInputChange}
            placeholder="Additional specification"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows="3"
          ></textarea>
        </div>

        <div className="mt-6 flex justify-center items-center ">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
