import React, { useState, useEffect, useRef  } from 'react';
import './FormComponent.css';
import frogSvg from './assets/img/frog.svg';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const FormComponent = () => {
  const [animationReady, setAnimationReady] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const lastCurrentStep = usePrevious(currentStep);
  const [formData, setFormData] = useState({
    months_as_customer: '',
    age: '',
    policy_annual_premium: '',
    incident_severity: '',
    total_claim_amount: '',
    days_between_bind_incident: ''
  });

  // Function to move to the form
  const showForm = () => {
    setCurrentStep(1); // Transition to the form
  };

  const [animation, setAnimation] = useState('form-page-enter');
  const totalSteps = 7;

  useEffect(() => {
    // Handle the transition from Marvin to the form
    if (currentStep === 1 && lastCurrentStep === 0) {
      setAnimation('form-page-enter'); // Animation for the form appearing after Marvin
    }
    // Handle form navigation animations (excluding the initial step)
    else if (currentStep > 1) {
      if (lastCurrentStep < currentStep) {
        setAnimation('form-page-enter');
      } else if (lastCurrentStep > currentStep) {
        console.log('show previous');
        setAnimation('form-page-exit-prev');
      }
    }
    // Optionally, handle Marvin's introduction animation if needed
    // This could be a fade-in animation when the component first mounts
    // if (currentStep === 0) {
    //   setAnimation('marvin-intro');
    // }
  }, [currentStep, lastCurrentStep]);

  const handleAnimationEnd = () => {
    setAnimation('');
    setAnimationReady(true);
  };

  const renderFormStep = () => {
    let formPageClass = `form-page ${animation}`;

    switch (currentStep) {
      case 1:
        return (
          <div className={formPageClass} onAnimationEnd={handleAnimationEnd}>
            <div className="form-page">
              <label htmlFor="full-name">Full Name</label>
              <input
                type="text"
              />
              <div className="form-navigation">
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={formPageClass} onAnimationEnd={handleAnimationEnd}>
            <div className="form-page">
              <label htmlFor="months_as_customer">Months as Customer:</label>
              <input
                type="number"
                id="months_as_customer"
                name="months_as_customer"
                value={formData.months_as_customer}
                onChange={handleChange}
              />
              <div className="form-navigation">
                <button type="button" onClick={prevStep}>Previous</button>
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={formPageClass} onAnimationEnd={handleAnimationEnd}>
            <div className="form-page">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              <div className="form-navigation">
                <button type="button" onClick={prevStep}>Previous</button>
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={formPageClass} onAnimationEnd={handleAnimationEnd}>
            <div className="form-page">
              <label htmlFor="policy_annual_premium">Policy Annual Premium:</label>
              <input
                type="number"
                id="policy_annual_premium"
                name="policy_annual_premium"
                value={formData.policy_annual_premium}
                onChange={handleChange}
              />
              <div className="form-navigation">
                <button type="button" onClick={prevStep}>Previous</button>
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className={formPageClass} onAnimationEnd={handleAnimationEnd}>
            <div className="form-page">
              <label htmlFor="incident_severity">Incident Severity:</label>
              <select
                id="incident_severity"
                name="incident_severity"
                value={formData.incident_severity}
                onChange={handleChange}
              >
                <option value="">Select Severity</option>
                <option value="3">Trivial Damage</option>
                <option value="1">Minor Damage</option>
                <option value="0">Major Damage</option>
                <option value="2">Total Loss</option>
              </select>
              <div className="form-navigation">
                <button type="button" onClick={prevStep}>Previous</button>
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className={formPageClass} onAnimationEnd={handleAnimationEnd}>
            <div className="form-page">
              <label htmlFor="total_claim_amount">Total Claim Amount:</label>
              <input
                type="number"
                id="total_claim_amount"
                name="total_claim_amount"
                value={formData.total_claim_amount}
                onChange={handleChange}
              />
              <div className="form-navigation">
                <button type="button" onClick={prevStep}>Previous</button>
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className={formPageClass} onAnimationEnd={handleAnimationEnd}>
            <div className="form-page">
              <label htmlFor="days_between_bind_incident">Days Between Policy Bind Date and Incident:</label>
              <input
                type="number"
                id="days_between_bind_incident"
                name="days_between_bind_incident"
                value={formData.days_between_bind_incident}
                onChange={handleChange}
              />
              <div className="form-navigation">
                <button type="button" onClick={prevStep}>Previous</button>
                <button type="submit">Submit</button>
              </div>
            </div>
          </div>
        );
        // Continue adding additional cases for each dropdown field... 
      default:
        return null;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && animationReady) {
      setAnimationReady(false); // Prevent new animations until ready
      setAnimation('form-page-exit');
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 500); // Match your animation duration
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1 && animationReady) {
      setAnimationReady(false); // Prevent new animations until ready
      setAnimation('form-page-enter-prev');
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
      }, 500); // Match your animation duration
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Assuming formData is an object containing your form data
  
    try {
      const response = await fetch('http://127.0.0.1:5000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: formData, // Make sure this matches the expected format of your backend
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result); // Process your response here
    } catch (error) {
      console.error("Failed to send form data:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="frog-section">
        <img src={frogSvg} alt="Marvin, the Frogressive Frog" className={`frog-image ${currentStep === 0 ? 'enter' : 'side'}`} />
        {currentStep === 0 && <p>Marvin, the Frogressive Frog is here to help you file your claim</p>}
        {/* Button to manually transition from Marvin to the form */}
        {currentStep === 0 && <button onClick={showForm} className="btn-show-form">Start Filing Claim</button>}
      </div>
      {currentStep >= 1 && (
        <form onSubmit={handleSubmit}>
          <div className="form-page">
            {renderFormStep()}
          </div>
        </form>
      )}
    </div>
  );
};

export default FormComponent;
