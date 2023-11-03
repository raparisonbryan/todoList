"use client";

import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      phone,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        data
      );
      console.log("inscription réussie");
      console.log(response);

      window.location.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-1 relative overflow-hidden">
        <h1 className="text-[64px] font-serif font-bold">Make a Task</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            className="px-[20px] py-[10px] rounded-lg text-black"
            type="text"
            placeholder="Prénom et Nom"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="px-[20px] py-[10px] rounded-lg text-black"
            type="tel"
            placeholder="Téléphone"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="px-[20px] py-[10px] rounded-lg text-black"
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-[20px] py-[10px] rounded-lg text-black"
            type="password"
            placeholder="Mot de passe"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="px-[30px] py-[15px] border-solid border-2 border-sky-500 bg-sky-500 rounded-lg text-white font-bold hover:bg-transparent hover:text-sky-500 transition-all"
            type="submit"
          >
            Inscription
          </button>
        </form>
        <div className="absolute top-[-100px] left-[0px] bg-sky-500 blur-3xl opacity-20 w-[150px] h-[500px] rotate-45 rounded-lg"></div>
        <div className="absolute bottom-[0px] right-[0px] bg-red-500 blur-3xl opacity-10 w-[150px] h-[500px] rotate-12 rounded-lg"></div>
      </main>
    </>
  );
}
