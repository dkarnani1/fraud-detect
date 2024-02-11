import React, { useState, useEffect, useRef  } from 'react';
import './FormComponent.css';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const FormComponent = () => {
  const [animationReady, setAnimationReady] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const lastCurrentStep = usePrevious(currentStep);
  const [formData, setFormData] = useState({
    months_as_customer: '',
    age: '',
    policy_annual_premium: '',
    incident_severity: '',
    total_claim_amount: '',
    days_between_bind_incident: ''
  });

  const [animation, setAnimation] = useState('form-page-enter');
  const totalSteps = 6;

  useEffect(() => {
    if(lastCurrentStep < currentStep){
      setAnimation('form-page-enter');
    } else {
      console.log('show previous')
      setAnimation('form-page-exit-prev');
    }
  }, [currentStep]);

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
              <label htmlFor="months_as_customer">Months as Customer:</label>
              <input
                type="number"
                id="months_as_customer"
                name="months_as_customer"
                value={formData.months_as_customer}
                onChange={handleChange}
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
      case 3:
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
      case 4:
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
                <option value="Trivial Damage">Trivial Damage</option>
                <option value="Minor Damage">Minor Damage</option>
                <option value="Major Damage">Major Damage</option>
                <option value="Total Loss">Total Loss</option>
              </select>
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
      case 6:
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Logic to handle form submission
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-page">
          {renderFormStep()}
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
