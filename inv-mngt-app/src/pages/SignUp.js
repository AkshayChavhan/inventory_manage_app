import React, { useState } from 'react';
import { ModifiedTextfield } from "../components/inputs/input";
import CustomizedButtons from '../components/action_buttons/action_buttons';

export default function SignUp() {

  const [ form , setForm ] = useState({
    name : "",
    email : "",
    password: ""
  }) 

  console.log(form);
  return (
    <>
      <ModifiedTextfield
        label="Name"
        placeholder="<NAME>"
        value={form?.name || ""}
        onChange={(e) => { setForm({ ...form , name : e.target.value}) }}
        options={{ horizontalLabel: true }}
        required={true}
      />
      <ModifiedTextfield
        label="Email"
        placeholder="<NAME>"
        value={form?.email || ""}
        onChange={(e) => { setForm({ ...form , email : e.target.value}) }}
        options={{ horizontalLabel: true }}
        required={true}
      />
      <ModifiedTextfield
        label="Password"
        placeholder="<NAME>"
        value={form?.password || ""}
        onChange={(e) => { setForm({ ...form , password : e.target.value}) }}
        options={{ horizontalLabel: true }}
        required={true}
      />
      <CustomizedButtons
        content={"Cancel"}
      />
      <CustomizedButtons
        content={"Register"}
      />
    </>
  )
}
