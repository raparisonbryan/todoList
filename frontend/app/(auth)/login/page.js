"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        data
      );
      console.log("connexion réussie");
      console.log(response);

      if (response.data && response.data.token) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);
        const expiryDateString = expiryDate.toUTCString();

        document.cookie = `token=${response.data.token}; expires=${expiryDateString}; path=/;`;

        console.log(document.cookie);
        window.location.replace("/dashboard");
      } else {
        console.log("Token not found in the response");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Mot de passe incorrect ou utilisateur non trouvé.");
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
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
            Connexion
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className="bg-white w-[150px] h-[1px] mt-[30px] mb-[20px]"></div>
        <Link className="hover:text-sky-500 transition-all" href="/sign-up">
          Inscription
        </Link>
        <div className="absolute top-[-100px] left-[0px] bg-sky-500 blur-3xl opacity-20 w-[150px] h-[500px] rotate-45 rounded-lg"></div>
        <div className="absolute bottom-[0px] right-[0px] bg-red-500 blur-3xl opacity-10 w-[150px] h-[500px] rotate-12 rounded-lg"></div>
      </main>
    </>
  );
}
