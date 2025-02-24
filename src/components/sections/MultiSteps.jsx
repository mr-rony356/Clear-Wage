import React, { useState } from "react";
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
  OutlinedInput,
  InputAdornment,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useStepData } from "../../context/stepsData";
import CloseIcon from "@mui/icons-material/Close";
import emailjs from "emailjs-com";

// Form field configurations
const FORM_STEPS = [
  {
    id: 1,
    field: "Salary",
    title: "What's your current salary?",
    type: "currency",
    label: "Salary",
    required: true,
  },
  {
    id: 2,
    field: "JDYear",
    title: "What year did you get your JD?",
    type: "select",
    label: "JD Year",
    required: true,
    options: [
      ...Array.from({ length: 23 }, (_, index) => ({
        value: (2024 - index).toString(),
        label: (2024 - index).toString(),
      })),
      { value: "Before 2000", label: "Before 2000" },
    ],
  },
  {
    id: 3,
    field: "Title",
    title: "What's your title?",
    type: "select",
    label: "Title",
    required: true,
    options: [
      {
        value: "Assistant General Counsel (In-House)",
        label: "Assistant General Counsel (In-House)",
      },
      {
        value: "Associate General Counsel (In-House)",
        label: "Associate General Counsel (In-House)",
      },
      { value: "Associate", label: "Associate" },
      { value: "Equity partner", label: "Equity partner" },
      {
        value: "General Counsel (In-House)",
        label: "General Counsel (In-House)",
      },
      { value: "Non-equity partner", label: "Non-equity partner" },
      { value: "Of Counsel", label: "Of Counsel" },
      { value: "Senior Associate", label: "Senior Associate" },
    ],
  },
  {
    id: 4,
    field: "PracticeArea",
    title: "What practice area do you work in?",
    type: "select",
    label: "Practice Area",
    required: true,
    options: [
      { value: "Banking", label: "Banking" },
      { value: "Bankruptcy", label: "Bankruptcy" },
      { value: "Civil Litigation", label: "Civil Litigation" },
      { value: "Commercial  Litigation", label: "Commercial Litigation" },
      { value: "Construction Litigation", label: "Construction Litigation" },
      {
        value: "Corporate (Transactional)",
        label: "Corporate (Transactional)",
      },
      { value: "Education", label: "Education" },
      { value: "Energy", label: "Energy" },
      { value: "Environment", label: "Environment" },
      { value: "Erisa", label: "ERISA" },
      { value: "Family", label: "Family" },
      {
        value: "Financial Services Litigation",
        label: "Financial Services Litigation",
      },
      {
        value: "First Party Property Defense",
        label: "First Party Property Defense",
      },
      { value: "General Practice", label: "General Practice" },
      { value: "Government", label: "Government" },
      { value: "Healthcare", label: "Healthcare" },
      { value: "Immigration", label: "Immigration" },
      { value: "Information Technology", label: "Information Technology" },
      {
        value: "Insurance defense litigation",
        label: "Insurance Defense Litigation",
      },
      { value: "Insurance ", label: "Insurance " },
      { value: "Insurance Coverage", label: "Insurance Coverage" },
      { value: "Insurance Plaintiffs", label: "Insurance Plaintiffs" },
      { value: "Intellection Property", label: "Intellection Property" },
      { value: "Labor & Employment", label: "Labor & Employment" },
      {
        value: "Medical Malpractice Defence",
        label: "Medical Malpractice Defence",
      },
      {
        value: "Medical Malpractice Plaintiffs",
        label: "Medical Malpractice Plaintiffs",
      },
      {
        value: "Personal Injury Plaintiffs",
        label: "Personal Injury Plaintiffs",
      },
      {
        value: "Property Damage Plaintiffs",
        label: "Property Damage Plaintiffs",
      },
      { value: "Real Estate", label: "Real Estate" },
      { value: "Tax", label: "Tax" },
      { value: "Transportation", label: "Transportation" },
      { value: "Trusts & Estates", label: "Trusts & Estates" },
      { value: "Other", label: "Other" },
    ],

    conditionalField: {
      when: "Other",
      show: {
        field: "OtherPracticeArea",
        type: "text",
        label: "Please Type Practice Area",
      },
    },
  },
  {
    id: 5,
    field: "City",
    title: " What city do you work in?",
    type: "text",
    label: "City",
    required: true,
  },
  {
    id: 6,
    field: "State",
    title: "What state do you work in?",
    type: "text",
    label: "State",
    required: true,
  },
  {
    id: 7,
    field: "Bonuses",
    title: "What did you make in bonuses last year?",
    type: "currency",
    label: "Last year Bonuses",
    required: false,
  },
  {
    id: 8,
    field: "Gender",
    title: "What's your gender?",
    description:
      "This helps track pay gaps in the profession. Leave blank if you don't want to disclose",
    type: "select",
    label: "Gender",
    required: false,
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Other", label: "No comment" },
    ],
  },
  {
    id: 9,
    field: "FirmSize",
    title: "What size firm are you at?  ",
    type: "select",
    label: "Firm Size",
    required: true,
    options: [
      {
        value: "Boutique (1-20 attorneys)",
        label: "Boutique (1-20 attorneys)",
      },
      {
        value: "Mid-size (21-100 attorneys)",
        label: "Mid-size (21-100 attorneys)",
      },
      { value: "Large (101+ attorneys)", label: "Large (101+ attorneys)" },
      { value: "Am100", label: "Am100" },
      { value: "Am200", label: "Am200" },
    ],
  },
  {
    id: 10,
    field: "FirmName",
    title: "Which firm are you with?",
    description:
      "This won't be shown publicly, but helps improve the accuracy of our data",
    type: "text",
    label: "Firm Name",
    required: false,
  },
];

function FormField({ step, formData, handleInputChange }) {
  const stepConfig = FORM_STEPS[step - 1];

  switch (stepConfig.type) {
    case "currency":
      return (
        <FormControl fullWidth>
          <InputLabel>{stepConfig.label}</InputLabel>
          <OutlinedInput
            name={stepConfig.field}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label={stepConfig.label}
            value={formData[stepConfig.field]}
            onChange={handleInputChange}
          />
        </FormControl>
      );

    case "select":
      return (
        <FormControl fullWidth>
          <InputLabel>{stepConfig.label}</InputLabel>
          <Select
            name={stepConfig.field}
            value={formData[stepConfig.field]}
            label={stepConfig.label}
            onChange={handleInputChange}
          >
            <MenuItem value="">Select {stepConfig.label}</MenuItem>
            {stepConfig.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {stepConfig.conditionalField &&
            formData[stepConfig.field] === stepConfig.conditionalField.when && (
              <TextField
                label={stepConfig.conditionalField.show.label}
                name={stepConfig.conditionalField.show.field}
                value={formData[stepConfig.conditionalField.show.field]}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: "10px" }}
              />
            )}
        </FormControl>
      );

    case "text":
    default:
      return (
        <TextField
          label={stepConfig.label}
          name={stepConfig.field}
          value={formData[stepConfig.field]}
          onChange={handleInputChange}
          fullWidth
        />
      );
  }
}

function Modal({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { addStepData } = useStepData();
  const [step, setStep] = useState(1);
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
    Date_Documented: new Date().toLocaleDateString("en-US", {
      timeZone: "UTC",
    }),
  });
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    personalEmail: "",
    cellNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserInputChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const isStepComplete = (step) => {
    const currentStep = FORM_STEPS[step - 1];
    if (!currentStep.required) return true;
    return formData[currentStep.field] !== "";
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbxWJzD7pTYLpFvgi_Y7PuLhKCpbUAW9FR_TLupd-HoIkJVqcknqw7KRfrWf3O5XxsU/exec";
    const formDataAllSteps = { ...formData };

    if (formData.PracticeArea === "Other") {
      formDataAllSteps.PracticeArea = formData.OtherPracticeArea;
    }

    const queryParams = new URLSearchParams(formDataAllSteps).toString();

    try {
      await fetch(`${scriptUrl}?${queryParams}`, { method: "POST" });
      localStorage.setItem("hasContributed", "true");
      addStepData(formData);
      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePopupSubmit = async () => {
    try {
      await emailjs.send(
        "service_h5aj7mu",
        "template_0v360iu",
        {
          ...userFormData,
          date: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
        },
        "s9CcYy5vclsSxAZhY"
      );
      setShowPopup(false);
      onClose();
      window.scrollTo({
        top: document.getElementById("last").offsetTop,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <>
      {!showPopup ? (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
          <DialogTitle>
            <div>
              Step {step}/10: {FORM_STEPS[step - 1].title}
              {FORM_STEPS[step - 1].description && (
                <Typography
                  component="span"
                  sx={{
                    fontSize: "0.8rem",
                    color: "text.secondary",
                    display: "block",
                    mt: 0.5,
                  }}
                >
                  ({FORM_STEPS[step - 1].description})
                </Typography>
              )}
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <FormField
              step={step}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            {step > 1 && (
              <Button onClick={() => setStep(step - 1)}>Back</Button>
            )}
            {step < 10 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!isStepComplete(step)}
              >
                {FORM_STEPS[step - 1].required ||
                formData[FORM_STEPS[step - 1].field]
                  ? "Next"
                  : "Skip"}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? "Processing..." : "Submit"}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={onClose}
          fullScreen={isMobile}
          maxWidth="sm"
        >
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "25px", fontWeight: "bold", mt: 4 }}
                >
                  Congratulations! You've unlocked the salary database.
                </Typography>
                <Typography sx={{ my: 1, fontSize: "12px" }}>
                  Now you have the real numbers—use them to negotiate smarter
                  and get what you're worth.
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Before you get to the salary data—Want to Know If There's a
                  Better Opportunity for You?
                </Typography>
                <Typography sx={{ my: 1, fontSize: "12px" }}>
                  ClearWage is run by Holtz & Bernard LLC, an attorney placement
                  firm based in Miami, FL, we help attorneys like you land
                  higher-paying, better-fit roles. And here's the thing: The
                  best opportunities aren't publicly listed.{" "}
                </Typography>
                <Typography sx={{ my: 1, fontSize: "12px" }}>
                  Want to know what's out there? Drop your info below, and we'll
                  discreetly reach out with options tailored to you. (You've got
                  nothing to lose—and possibly a ton to gain.)
                </Typography>
              </Box>
              <IconButton
                onClick={onClose}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <CloseIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {["firstName", "lastName", "personalEmail", "cellNumber"].map(
              (field) => (
                <TextField
                  key={field}
                  label={
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  name={field}
                  value={userFormData[field]}
                  onChange={handleUserInputChange}
                  fullWidth
                  size="small"
                  margin="normal"
                  type={
                    field.includes("email")
                      ? "email"
                      : field.includes("cell")
                      ? "tel"
                      : "text"
                  }
                />
              )
            )}
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <Button
              onClick={handlePopupSubmit}
              sx={{
                width: "70%",
                m: isMobile ? "20px 0" : "25px 0",
                color: "#3182ce",
                border: "2px solid #3182ce",
                "&:hover": {
                  color: "white",
                  bgcolor: "#3182ce",
                  border: "2px solid #3182ce",
                },
              }}
            >
              Yes, Show Me Opportunities
            </Button>
            <Button
              onClick={onClose}
              sx={{
                width: "70%",
                color: "#3182ce",
                border: "2px solid #3182ce",
                "&:hover": {
                  color: "white",
                  bgcolor: "#3182ce",
                  border: "2px solid #3182ce",
                },
              }}
            >
              Just Show Me The Data
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default Modal;
