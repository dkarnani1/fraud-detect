import React from 'react';
import './FormComponent.css'; // Make sure the CSS file name matches

class FormComponent extends React.Component {
  render() {
    return (
      <div className="form-container">
        <form>
          <h2>Contact Us</h2>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" placeholder="Your Email" />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea placeholder="Your Message"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default FormComponent;
