"use client";

import React from 'react'
import { useBearStore } from '../(store)/store'

export default function About() {
  const {bears, increase} = useBearStore();
  return (
    <div>
      <h2>Bears: {bears}</h2>
      <button className='bg-primary p-2 rounded-md texthw' onClick={() => increase(1)}>Increase Bears</button>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, praesentium unde. Ducimus nemo debitis cupiditate natus architecto pariatur perspiciatis commodi! Distinctio cupiditate qui vitae modi doloribus suscipit dolorem sequi soluta iusto velit? Doloribus dolor animi architecto tempore earum harum, possimus quibusdam voluptatibus ut qui quaerat temporibus repellendus expedita excepturi. Mollitia.</p>
    </div>
  )
}
