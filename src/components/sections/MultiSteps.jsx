import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useStepData } from "../../context/stepsData"; // Importing the useStepData hook
import CloseIcon from "@mui/icons-material/Close";
import emailjs from "emailjs-com";

function Modal({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { addStepData } = useStepData(); // Accessing the addStepData function from the context
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return formData.Salary !== "";

      case 2:
        return formData.JDYear !== "";

      case 3:
        return formData.Title !== "";

      case 4:
        return formData.PracticeArea !== "";

      case 5:
        return formData.City !== "";

      case 6:
        return formData.State !== "";

      case 7:
        return formData.Bonuses !== "";
      case 8:
        return formData.Gender !== "";

      case 9:
        return formData.FirmName !== "";

      case 10:
        return formData.FirmSize !== "";
      default:
        return false;
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    FirmName: "",
    FirmSize: "",
    Title: "",
    PracticeArea: "",
    OtherPracticeArea: "",
    JDYear: "",
    State: "",
    City: "",
    Salary: "",
    Bonuses: "",
    Gender: "",
    Date_Documented: new Date(),
  });
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleuserInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbxWJzD7pTYLpFvgi_Y7PuLhKCpbUAW9FR_TLupd-HoIkJVqcknqw7KRfrWf3O5XxsU/exec";
  const handleSubmit = (e) => {
    setShowPopup(true);
    const formDataAllSteps = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "") {
        if (key === "PracticeArea" && formData[key] === "Other") {
          formDataAllSteps["PracticeArea"] = formData["OtherPracticeArea"];
        } else {
          formDataAllSteps[key] = formData[key];
        }
      }
    });

    // Convert formDataAllSteps into query parameters string
    const queryParams = new URLSearchParams(formDataAllSteps).toString();

    // Submit all form data to Google Sheets
    fetch(`${scriptUrl}?${queryParams}`, {
      method: "POST",
    })
      .then((res) => {
        console.log("SUCCESSFULLY SUBMITTED");
        console.log("Form data:", formDataAllSteps);
        addStepData(formData);
      })
      .catch((err) => console.log(err));

    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  const handlePopupSubmit = async () => {
    // Your logic to handle popup form submission
    const currentDate = new Date().toLocaleDateString("en-US", {
      timeZone: "UTC",
    });

    try {
      await emailjs.send(
        "service_h5aj7mu",
        "template_0v360iu",
        {
          firstName: userFormData.firstName,
          lastName: userFormData.lastName,
          cellNumber: userFormData.cellNumber,
          personalEmail: userFormData.personalEmail,
          date: currentDate,
        },
        "s9CcYy5vclsSxAZhY"
      );

      console.log("Email sent successfully");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error sending email:", error);
    }

    console.log("Popup form data:", userFormData);
    setShowPopup(false);
    onClose();
  };
  return (
    <div>
      {!showPopup && (
        <Dialog
          open={open}
          onClose={onClose}
          sx={{
            minHeight: "100vh",
          }}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Step {step}/10: Multi-Step Form</DialogTitle>

          <DialogContent dividers>
            {step === 1 && (
              <>
                {" "}
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Salary
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    name="Salary"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    value={formData.Salary} // Set the value here
                    onChange={handleInputChange} // Ensure onChange is handled for input change
                  />
                </FormControl>
                {/* Add other input fields for step 7 if needed */}
              </>
            )}
            {step === 2 && (
              <>
                <FormControl fullWidth>
                  <InputLabel>JD Year</InputLabel>
                  <Select
                    name="JDYear"
                    value={formData.JDYear}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">Select JD Year</MenuItem>
                    {Array.from({ length: 23 }, (_, index) => 2023 - index).map(
                      (year, index) => (
                        <MenuItem key={index} value={year.toString()}>
                          {year}
                        </MenuItem>
                      )
                    )}
                    <MenuItem value="Before 2000">Before 2000</MenuItem>{" "}
                    {/* Add this option */}
                  </Select>
                </FormControl>
                {/* Add other input fields for step 4 if needed */}
              </>
            )}
            {step === 3 && (
              <>
                <FormControl fullWidth>
                  <InputLabel>Title</InputLabel>
                  <Select
                    name="Title"
                    value={formData.Title}
                    required
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">Select Title</MenuItem>
                    <MenuItem value="Associate">Associate</MenuItem>
                    <MenuItem value="Senior Associate">
                      Senior Associate
                    </MenuItem>
                    <MenuItem value="Non-equity partner">
                      Non-equity partner
                    </MenuItem>
                    <MenuItem value="Equity partner">Equity partner</MenuItem>
                    <MenuItem value="Of counsel">Of counsel</MenuItem>
                    <MenuItem value="In-House General Counsel">
                      In-House General Counsel
                    </MenuItem>
                  </Select>
                </FormControl>

                {/* Add other input fields for step 2 if needed */}
              </>
            )}

            {step === 4 && (
              <>
                <FormControl fullWidth>
                  <InputLabel>Practice Area</InputLabel>
                  <Select
                    name="PracticeArea"
                    value={formData.PracticeArea}
                    required
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">Select Practice Area</MenuItem>
                    <MenuItem value="Insurance defense litigation">
                      Insurance Defense Litigation
                    </MenuItem>
                    <MenuItem value="Insurance plaintiff litigation">
                      Insurance Plaintiff Litigation
                    </MenuItem>
                    <MenuItem value="Corporate">Corporate</MenuItem>
                    <MenuItem value="Civil Litigation">
                      Civil Litigation
                    </MenuItem>
                    <MenuItem value="Commercial  Litigation">
                      Commercial Litigation
                    </MenuItem>
                    <MenuItem value="Banking">Banking</MenuItem>
                    <MenuItem value="Insurance ">Insurance </MenuItem>
                    <MenuItem value="Bankruptcy">Bankruptcy</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Energy">Energy</MenuItem>
                    <MenuItem value="Environment">Environment</MenuItem>
                    <MenuItem value="Erisa">ERISA</MenuItem>
                    <MenuItem value="General Practice">
                      General Practice
                    </MenuItem>
                    <MenuItem value="Government">Government</MenuItem>
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Immigration">Immigration</MenuItem>
                    <MenuItem value="Information Technology">
                      Information Technology
                    </MenuItem>
                    <MenuItem value="Insurance">Insurance</MenuItem>
                    <MenuItem value="Intellection Property">
                      Intellection Property
                    </MenuItem>
                    <MenuItem value="Labor & Employment">
                      Labor & Employment
                    </MenuItem>
                    <MenuItem value="Real Estate">Real Estate</MenuItem>
                    <MenuItem value="Tax">Tax</MenuItem>
                    <MenuItem value="Transportation">Transportation</MenuItem>
                    <MenuItem value="Trusts & Estates">
                      Trusts & Estates
                    </MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                {formData.PracticeArea === "Other" && (
                  <TextField
                    label="Please Type Practice Area"
                    name="OtherPracticeArea"
                    value={formData.OtherPracticeArea}
                    onChange={handleInputChange}
                    fullWidth
                  />
                )}
                {/* Add other input fields for step 3 if needed */}
              </>
            )}
            {step === 5 && (
              <>
                <TextField
                  label="City"
                  name="City"
                  value={formData.City}
                  onChange={handleInputChange}
                  fullWidth
                />
                {/* Add other input fields for step 6 if needed */}
              </>
            )}

            {step === 6 && (
              <>
                <TextField
                  label="State"
                  name="State"
                  value={formData.State}
                  onChange={handleInputChange}
                  fullWidth
                />
                {/* Add other input fields for step 5 if needed */}
              </>
            )}
            {step === 7 && (
              <>
                {" "}
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Last year Bonuses
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    name="Bonuses"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Bonuses"
                    value={formData.Bonuses} // Set the value here
                    onChange={handleInputChange} // Ensure onChange is handled for input change
                  />
                </FormControl>
                {/* Add other input fields for step 7 if needed */}
              </>
            )}
            {step === 8 && (
              <>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    {/* Add other options for Gender */}
                  </Select>
                </FormControl>
                {/* Add other input fields for step 10 if needed */}
              </>
            )}
            {step === 9 && (
              <>
                <TextField
                  label="Firm Name"
                  name="FirmName"
                  value={formData.FirmName}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                  margin="normal"
                />
              </>
            )}

            {step === 10 && (
              <>
                <FormControl fullWidth>
                  <InputLabel>Firm Size</InputLabel>
                  <Select
                    labelId="firm-size-label"
                    label="FirmSize"
                    name="FirmSize"
                    value={formData.FirmSize}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Boutique (1-20 attorneys)">
                      Boutique (1-20 attorneys)
                    </MenuItem>
                    <MenuItem value="Mid-size (21-100 attorneys)">
                      Mid-size (21-100 attorneys)
                    </MenuItem>
                    <MenuItem value="Large (100+ attorneys)">
                      Large (100+ attorneys)
                    </MenuItem>
                    <MenuItem value="Am100">Am100</MenuItem>
                    <MenuItem value="Am200">Am200</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>

          <DialogActions>
            {step !== 1 && <Button onClick={handlePrevStep}>Back</Button>}
            {step !== 10 ? (
              // Check if all required fields are filled before proceeding to the next step
              <Button onClick={handleNextStep} disabled={!isStepComplete(step)}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Done</Button>
            )}
          </DialogActions>
        </Dialog>
      )}

      {/* Popup for additional info */}
      {showPopup && (
        <Dialog
          fullScreen={isMobile ? true : false}
          style={{ maxWidth: "sm", height: "auto" }}
          open={open}
          onClose={onClose}
          sx={{}}
        >
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Box>
              <Typography
                variant="h5 "
                sx={{
                  fontSize: "20px",
                }}
              >
                {" "}
                Wait! Before reviewing the data!
              </Typography>
              <Typography
                sx={{
                  margin: "10px 0 0 0",
                  fontSize: "12px",
                }}
              >
                We are sponsored by Holtz & Bernard, an attorney recruitment
                firm in Miami, FL. Are you open to hearing about new attorney
                opportunities? If so, enter your info and they will reach out!
              </Typography>
            </Box>
            <IconButton
              aria-label="close"
              sx={{
                position: "absolute",
                top: "0px ",
                right: "0px",
              }}
              onClick={onClose}
            >
              <CloseIcon
                fontSize="xl"
                sx={{
                  fontSize: "30px",
                }}
              />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              paddingBottom: "0",
            }}
          >
            <TextField
              label="First Name"
              name="firstName"
              value={userFormData.firstName || ""}
              onChange={handleuserInputChange}
              fullWidth
              size="small"
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={userFormData.lastName || ""}
              onChange={handleuserInputChange}
              fullWidth
              size="small"
              margin="normal"
            />
            <TextField
              label="Email"
              name="personalEmail"
              type="email"
              value={userFormData.personalEmail || ""}
              onChange={handleuserInputChange}
              fullWidth
              size="small"
              margin="normal"
            />
            <TextField
              label="Phone"
              name="cellNumber"
              type="tel"
              value={userFormData.cellNumber || ""}
              onChange={handleuserInputChange}
              fullWidth
              size="small"
              margin="normal"
            />
          </DialogContent>
          <DialogActions className="flex-center">
            <Button
              onClick={handlePopupSubmit}
              sx={{
                background: "white",
                color: "#3182ce",
                width: "40%",
                border: "2px solid #3182ce",
                margin: isMobile ? "20px 0" : "25px 0", // Change text color on hover

                "&:hover": {
                  color: "white",
                  backgroundColor: "#3182ce", // Change background color on hover
                  border: "2px solid #3182ce", // Change text color on hover
                },
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Modal;
