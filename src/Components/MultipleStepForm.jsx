import { useState } from "react";

export const validateInput = (name, value) => {
  const errors = {};

  switch (name) {
    case "Name":
      if (!value.trim()) {
        errors[name] = "Name is required.";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        errors[name] = "Name must contain only alphabets.";
      }
      break;

    case "Number":
      if (!value.trim()) {
        errors[name] = "Number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        errors[name] = "Number must be a 10-digit number.";
      }
      break;

    case "Email":
      if (!value.trim()) {
        errors[name] = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[name] = "Enter a valid email address.";
      }
      break;

    case "Address":
      if (!value.trim()) {
        errors[name] = "Address is required.";
      } else if (value.length < 10) {
        errors[name] = "Address must be at least 10 characters long.";
      }
      break;

    case "pincode":
      if (!value.trim()) {
        errors[name] = "Pincode is required.";
      } else if (!/^\d{6}$/.test(value)) {
        errors[name] = "Pincode must be a 6-digit number.";
      }
      break;

    case "Gender":
      if (!value) {
        errors[name] = "Gender selection is required.";
      }
      break;

    default:
      break;
  }

  return {
    valid: Object.keys(errors).length === 0,
    error: errors[name] || null,
  };
};

export const StepOneForm = ({ setSteps, setFormErrors, formErrors, setFormData, formData }) => {
  const handleAddValues = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    const error = validateInput(e.target.name, e.target.value);
    if (!error.valid) {
      setFormErrors((prev) => ({
        ...prev,
        [e.target.name]: error.error,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleNextStep = () => {
    if (!formErrors.Name && !formErrors.Number && formData.Name && formData.Number) {
      setSteps("Second");
    } else {
      alert("Please fix errors before proceeding.");
    }
  };

  return (
    <div>
      <p>First Step</p>
      <div>
        <input
          type="text"
          onChange={handleAddValues}
          name="Name"
          placeholder="Enter name please"
          value={formData.Name || ""}
        />
        {formErrors?.Name && <p style={{ color: "red" }}>{formErrors.Name}</p>}
        <input
          type="number"
          onChange={handleAddValues}
          name="Number"
          placeholder="Enter your Number"
          value={formData.Number || ""}
        />
        {formErrors?.Number && <p style={{ color: "red" }}>{formErrors.Number}</p>}
      </div>
      <div>
        <button onClick={handleNextStep}>Next</button>
      </div>
    </div>
  );
};

export const StepTwoForm = ({ setSteps, setFormData, formData, setFormErrors, formErrors }) => {
  const handleAddValues = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    const error = validateInput(e.target.name, e.target.value);
    if (!error.valid) {
      setFormErrors((prev) => ({
        ...prev,
        [e.target.name]: error.error,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleNextStep = () => {
    if (!formErrors.Email && !formErrors.Address && formData.Email && formData.Address) {
      setSteps("Three");
    } else {
      alert("Please fix errors before proceeding.");
    }
  };

  return (
    <div>
      <p>Second Step</p>
      <div>
        <input
          type="email"
          onChange={handleAddValues}
          name="Email"
          placeholder="Enter mail please"
          value={formData.Email || ""}
        />
        {formErrors?.Email && <p style={{ color: "red" }}>{formErrors.Email}</p>}
        <input
          type="text"
          onChange={handleAddValues}
          name="Address"
          placeholder="Enter your Address"
          value={formData.Address || ""}
        />
        {formErrors?.Address && <p style={{ color: "red" }}>{formErrors.Address}</p>}
      </div>
      <div>
        <button onClick={() => setSteps("first")}>Back</button>
        <button onClick={handleNextStep}>Next</button>
      </div>
    </div>
  );
};

export const StepThreeForm = ({ setSteps, setFormData, formData, setFormErrors, formErrors }) => {
  const handleAddValues = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    const error = validateInput(e.target.name, e.target.value);
    if (!error.valid) {
      setFormErrors((prev) => ({
        ...prev,
        [e.target.name]: error.error,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = () => {
    if (!formErrors.pincode && !formErrors.Gender && formData.pincode && formData.Gender) {
      setSteps("Finish");
    } else {
      alert("Please fix errors before submitting.");
    }
  };

  return (
    <div>
      <p>Third Step</p>
      <div>
        <input
          type="number"
          onChange={handleAddValues}
          name="pincode"
          placeholder="Enter your Pincode"
          value={formData.pincode || ""}
        />
        {formErrors?.pincode && <p style={{ color: "red" }}>{formErrors.pincode}</p>}
        <select
          value={formData.Gender || ""}
          onChange={handleAddValues}
          name="Gender"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Trans">Trans</option>
          <option value="Others">Others</option>
        </select>
        {formErrors?.Gender && <p style={{ color: "red" }}>{formErrors.Gender}</p>}
      </div>
      <div>
        <button onClick={() => setSteps("Second")}>Back</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

const MultipleStepForm = () => {
  const [steps, setSteps] = useState("first");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  return (
    <div>
      {steps === "first" && (
        <StepOneForm setSteps={setSteps} setFormErrors={setFormErrors} formErrors={formErrors} formData={formData} setFormData={setFormData} />
      )}
      {steps === "Second" && (
        <StepTwoForm setSteps={setSteps} setFormErrors={setFormErrors} formErrors={formErrors} formData={formData} setFormData={setFormData} />
      )}
      {steps === "Three" && (
        <StepThreeForm setSteps={setSteps} setFormErrors={setFormErrors} formErrors={formErrors} formData={formData} setFormData={setFormData} />
      )}
      {steps === "Finish" && (
        <div>Form Submitted Successfully🙂</div>
      )}
    </div>
  );
};

export default MultipleStepForm;
