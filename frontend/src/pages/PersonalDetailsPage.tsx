import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COUNTRIES } from "@/lib/types/user";
import { INDUSTRIES } from "@/lib/types/industries";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function PersonalDetailsPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    invoiceCountry: "",
    phone: "",
    hearAbout: "",
    industry: "",
    updates: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save details and redirect
    // ...
    navigate("/dashboard");
  };

  return (
    <>
      <Header showFlashSale={false} />
      <div className="max-w-2xl mx-auto py-10 px-4 pt-[140px] pb-20">
        <h1 className="text-3xl font-bold mb-6">Personal Details</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block font-semibold mb-1">Title*</label>
            <select
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Choose an option</option>
              <option>Mr</option>
              <option>Miss</option>
              <option>Mrs</option>
              <option>Ms</option>
              <option>Prof</option>
              <option>Master</option>
              <option>Rev</option>
              <option>Sir</option>
              <option>Lord</option>
              <option>Lady</option>
              <option>Mix</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">First name*</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Middle name</label>
            <input
              name="middleName"
              value={form.middleName}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Last name*</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Date of birth*</label>
            <div className="flex gap-2">
              <input
                name="dobDay"
                value={form.dobDay}
                onChange={handleChange}
                required
                placeholder="DD"
                className="border rounded px-2 py-2 w-16"
              />
              <input
                name="dobMonth"
                value={form.dobMonth}
                onChange={handleChange}
                required
                placeholder="MM"
                className="border rounded px-2 py-2 w-16"
              />
              <input
                name="dobYear"
                value={form.dobYear}
                onChange={handleChange}
                required
                placeholder="YYYY"
                className="border rounded px-2 py-2 w-24"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Country*</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Choose an option</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Address*</label>
            <input
              name="address1"
              value={form.address1}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-full mb-2"
            />
            <input
              name="address2"
              value={form.address2}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">City / Town*</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Postcode*</label>
            <input
              name="postcode"
              value={form.postcode}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Country of Phone Number*
            </label>
            <select
              name="invoiceCountry"
              value={form.invoiceCountry}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Choose an option</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Phone*</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              How did you hear about us?
            </label>
            <select
              name="hearAbout"
              value={form.hearAbout}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Choose an option</option>
              <option value="Web Site">Web Site</option>
              <option value="Word of Mouth">Word of Mouth</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Company industry</label>
            <select
              name="industry"
              value={form.industry}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Choose an option</option>
              {INDUSTRIES.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="updates"
              checked={form.updates}
              onChange={handleChange}
              className="mr-2"
            />
            <span>
              Yes, I'd like to receive useful news, updates and exclusive offers
            </span>
          </div>
          <Button type="submit" className="mt-4 w-full">
            Update my details
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
