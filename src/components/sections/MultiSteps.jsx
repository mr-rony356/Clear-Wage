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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useStepData } from "../../context/stepsData";
import CloseIcon from "@mui/icons-material/Close";
import emailjs from "emailjs-com";

// Form field configurations
const FORM_STEPS = [
  {
    id: 1,
    fields: [
      {
        id: "Salary",
        field: "Salary",
        title: "What's your current salary?",
        type: "currency",
        label: "Salary",
        required: true,
      },
      {
        id: "Bonuses",
        field: "Bonuses",
        title: "What did you make in bonuses last year?",
        type: "currency",
        label: "Last year Bonuses",
        required: false,
      },
      {
        id: "JDYear",
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
    ],
  },
  {
    id: 2,
    fields: [
      {
        id: "Title",
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
        id: "PracticeArea",
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
          {
            value: "Construction Litigation",
            label: "Construction Litigation",
          },
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
        id: "City",
        field: "City",
        title: "What city do you work in?",
        type: "text",
        label: "City",
        required: true,
      },
      {
        id: "State",
        field: "State",
        title: "What state do you work in?",
        type: "text",
        label: "State",
        required: true,
      },
    ],
  },
  {
    id: 3,
    fields: [
      {
        id: "FirmSize",
        field: "FirmSize",
        title: "What size firm are you at?",
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
        id: "Gender",
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
        id: "FirmName",
        field: "FirmName",
        title: "Which firm are you with?",
        description:
          "This won't be shown publicly, but helps improve the accuracy of our data",
        type: "text",
        label: "Firm Name",
        required: false,
      },
    ],
  },
];

// Format currency input with commas and no cents
const formatCurrency = (value) => {
  if (!value) return "";

  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Format with commas
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Parse formatted currency back to a number
const parseCurrency = (formattedValue) => {
  if (!formattedValue) return "";
  return formattedValue.replace(/,/g, "");
};

function FormField({ fieldConfig, formData, handleInputChange }) {
  switch (fieldConfig.type) {
    case "currency":
      return (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{fieldConfig.label}</InputLabel>
          <OutlinedInput
            name={fieldConfig.field}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label={fieldConfig.label}
            value={formData[fieldConfig.field]}
            onChange={(e) => {
              const formatted = formatCurrency(e.target.value);
              handleInputChange({
                target: {
                  name: fieldConfig.field,
                  value: formatted,
                },
              });
            }}
          />
        </FormControl>
      );

    case "select":
      return (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{fieldConfig.label}</InputLabel>
          <Select
            name={fieldConfig.field}
            value={formData[fieldConfig.field]}
            label={fieldConfig.label}
            onChange={handleInputChange}
          >
            <MenuItem value="">Select {fieldConfig.label}</MenuItem>
            {fieldConfig.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {fieldConfig.conditionalField &&
            formData[fieldConfig.field] ===
              fieldConfig.conditionalField.when && (
              <TextField
                label={fieldConfig.conditionalField.show.label}
                name={fieldConfig.conditionalField.show.field}
                value={formData[fieldConfig.conditionalField.show.field]}
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
          label={fieldConfig.label}
          name={fieldConfig.field}
          value={formData[fieldConfig.field]}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
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
    interests: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserInputChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const isStepComplete = (step) => {
    const currentStepFields = FORM_STEPS[step - 1].fields;
    return currentStepFields.every(
      (field) => !field.required || formData[field.field] !== ""
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbxWJzD7pTYLpFvgi_Y7PuLhKCpbUAW9FR_TLupd-HoIkJVqcknqw7KRfrWf3O5XxsU/exec";
    const formDataAllSteps = { ...formData };

    // Parse currency fields back to numbers for submission
    if (formData.Salary) {
      formDataAllSteps.Salary = parseCurrency(formData.Salary);
    }
    if (formData.Bonuses) {
      formDataAllSteps.Bonuses = parseCurrency(formData.Bonuses);
    }

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

  const handleInterestToggle = (interest) => {
    setUserFormData((prev) => {
      const currentInterests = [...prev.interests];

      if (currentInterests.includes(interest)) {
        // Remove if already selected
        return {
          ...prev,
          interests: currentInterests.filter((item) => item !== interest),
        };
      } else {
        // Add if not selected
        return {
          ...prev,
          interests: [...currentInterests, interest],
        };
      }
    });
  };

  const handlePopupSubmit = async () => {
    try {
      await emailjs.send(
        "service_h5aj7mu",
        "template_0v360iu",
        {
          ...userFormData,
          interests: userFormData.interests.join(", "),
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
            <Box sx={{ width: "100%", mb: 2 }}>
              <Stepper activeStep={step - 1} alternativeLabel>
                {FORM_STEPS.map((stepConfig) => (
                  <Step key={stepConfig.id}>
                    <StepLabel>{stepConfig.title}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            {FORM_STEPS[step - 1].fields.map((fieldConfig) => (
              <Box key={fieldConfig.id} sx={{ mb: 2 }}>
                {/* {fieldConfig.title && (
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {fieldConfig.title}
                  </Typography>
                )} */}
                <FormField
                  fieldConfig={fieldConfig}
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            {step > 1 && (
              <Button onClick={() => setStep(step - 1)}>Back</Button>
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!isStepComplete(step)}
              >
                Next
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
          PaperProps={{
            sx: {
              borderRadius: "8px",
              maxWidth: "550px",
              width: "100%",
            },
          }}
        >
          <DialogTitle sx={{ p: 0 }}>
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ px: 4, pt: 2, pb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                my: 2,
                textAlign: "center",
                fontSize: { xs: "1.75rem", sm: "2.25rem" },
              }}
            >
              You're In! Salary Data Unlocked 🔓
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 3,
                textAlign: "center",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              Before You Dive In…
            </Typography>

            <Typography sx={{ mb: 2, textAlign: "center" }}>
              ClearWage is powered by Holtz & Bernard, an attorney recruiting
              agency.
            </Typography>

            <Typography sx={{ mb: 3, textAlign: "center" }}>
              Drop your info if you want us to reach out confidentially about
              new opportunities.
            </Typography>

            <Box sx={{ mb: 3 }}>
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                )
              )}
            </Box>

            <Typography sx={{ mb: 2, fontWeight: "medium" }}>
              Select what applies to you:
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                mb: 4,
                justifyContent: "center",
              }}
            >
              {[
                "Content But Curious",
                "Actively Looking",
                "Call Me To Discuss",
                "Email Me Opportunities",
              ].map((option) => (
                <Button
                  key={option}
                  variant={
                    userFormData.interests.includes(option)
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => handleInterestToggle(option)}
                  sx={{
                    borderRadius: "20px",
                    px: 2,
                    py: 0.75,
                    borderColor: "#3182ce",
                    color: userFormData.interests.includes(option)
                      ? "white"
                      : "#3182ce",
                    backgroundColor: userFormData.interests.includes(option)
                      ? "#3182ce"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: userFormData.interests.includes(option)
                        ? "#2c6cb0"
                        : "rgba(49, 130, 206, 0.08)",
                      borderColor: "#3182ce",
                    },
                  }}
                >
                  {option}
                </Button>
              ))}
            </Box>

            <Box sx={{ position: "relative", width: "100%", mb: 2 }}>
              <Button
                onClick={handlePopupSubmit}
                fullWidth
                variant="contained"
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  backgroundColor: "#473AFF",
                  padding: "16px 48px",
                  cursor: "pointer",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  transition: "background-color 0.3s, transform 0.2s",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                  zIndex: 1,
                  [theme.breakpoints.down("sm")]: {
                    padding: "15px 25px",
                  },
                  "&:hover": {
                    backgroundColor: "#2a2ad1",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                  "&:hover + .button-border": {
                    borderColor: "rgba(255, 255, 255, 0.4)",
                  },
                }}
              >
                Yes, Contact Me
              </Button>

              <Box
                className="button-border"
                sx={{
                  position: "absolute",
                  top: -6,
                  left: -6,
                  right: -6,
                  bottom: -6,
                  borderRadius: "0.405rem",
                  border: "2px solid #473AFF",
                  pointerEvents: "none",
                  transition: "border-color 0.3s",
                  zIndex: 0,
                }}
              />
            </Box>

            <Button
              onClick={onClose}
              fullWidth
              variant="text"
              sx={{
                color: "#718096",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Just Show Me The Data
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Modal;
