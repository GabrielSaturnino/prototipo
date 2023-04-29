import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h1>Sou a Home</h1>
      <Link to={'/main'}>Main page</Link>
    </>
  );
}