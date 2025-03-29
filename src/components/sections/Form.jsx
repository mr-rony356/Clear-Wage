import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { useTheme, useMediaQuery, Button } from "@mui/material";
import ButtonStyled from "../ButtonWrapper";

const MiuiSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: "50px 0",
});

function Form() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [totalEntries, setTotalEntries] = useState(0);
  const [hasContributed, setHasContributed] = useState(false);

  useEffect(() => {
    // Check localStorage for contribution status
    const contributionStatus = localStorage.getItem("hasContributed");
    setHasContributed(contributionStatus === "true");

    const fetchTotalEntries = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxWJzD7pTYLpFvgi_Y7PuLhKCpbUAW9FR_TLupd-HoIkJVqcknqw7KRfrWf3O5XxsU/exec"
        );
        const data = await response.json();
        setTotalEntries(data.length);
      } catch (error) {
        console.error("Error fetching total entries:", error);
        setTotalEntries(1000); // Fallback number if fetch fails
      }
    };

    fetchTotalEntries();
  }, []);

  const handleContributionStatus = () => {
    localStorage.setItem("hasContributed", "true");
    setHasContributed(true);
    window.scrollTo({
      top: document.getElementById("last").offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className=" text-black">
      <Box
        sx={{
          maxWidth: isMobile ? "95%" : "100%",
        }}
      >
        {!hasContributed ? (
          <div className="bg-white text-black flex flex-col items-center justify-center pt-24">
            <Box sx={{ maxWidth: "60%", margin: "0 auto" }}>
              <h3 className="text-[56px] font-bold text-[#212529] text-center">
                {totalEntries.toLocaleString()} attorneys (and counting) have
                shared their salaries so far
              </h3>
            </Box>
            <div className="flex-center max-w-[800px] mx-auto">
              <p className="text-[25px] font-[300] text-[#545659]">
                It only takes seconds. Your contribution is{" "}
                <strong>100% anonymous No names, no tracking </strong>.— just
                the raw numbers that help everyone.{" "}
              </p>
            </div>
            <ButtonStyled openModal={true} bgColor="#b59658">
              Unlock Salary Data Now →
            </ButtonStyled>
            <div
              onClick={handleContributionStatus}
              style={{
                fontSize: ".8rem",
                cursor: "pointer",
                color: "#7E8083",
              }}
            >
              <i>I already added my salary →</i>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[28px] lg:text-[64px] font-bold text-[#212529] text-white text-center">
              Get Salary Trends & <br /> Industry Insights Monthly{" "}
            </h1>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <iframe
                src="https://embeds.beehiiv.com/8e601ff8-0da2-4be5-ae6a-34be5be2e922?slim=true"
                data-test-id="beehiiv-embed"
                height="52"
                frameBorder="0"
                scrolling="no"
                className="m-0 !rounded-none bg-transparent w-full lg:max-w-[500px] max-w-[350px] mt-5"
              />
            </Box>
            <i>
              <p
                style={{
                  fontSize: "12px",
                  color: "white",
                  margin: "20px 0",
                }}
              >
                No spam, just pure value. Unsubscribe anytime.{" "}
              </p>
            </i>
          </div>
        )}
      </Box>
    </div>
  );
}

export default Form;
