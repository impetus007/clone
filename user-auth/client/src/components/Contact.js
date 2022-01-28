import { Button, TextareaAutosize } from "@mui/material";
import React from "react";
import "./contact.css";

function Contact() {
  return (
    <>
      <form className="contact">
        <h1>Get in Touch</h1>
        <input placeholder="name" type="text" />
        <input placeholder="email" type="email" />
        <input placeholder="phone" type="text" />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          placeholder="Drop Your essage here!"
          style={{ width: 500 }}
        />
        <Button variant="outlined">Contact me</Button>
      </form>
    </>
  );
}

export default Contact;
