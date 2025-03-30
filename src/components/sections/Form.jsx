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
    window.location.reload();
    window.scrollTo({
      top: document.getElementById("last").offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className=" text-black">
      <Box>
        {!hasContributed ? (
          <div className="bg-white text-black flex flex-col items-center justify-center lg:pt-24 pt-12">
            <div className="lg:max-w-[60%] max-w-[95%] mx-auto">
              <h3
                className="display-4 fw-bolder mb-3 position-relative text-center"
                style={{ maxWidth: "900px", margin: "0 auto" }}
              >
                {totalEntries.toLocaleString()} attorneys (and counting) have
                shared their salaries so far
              </h3>
            </div>
            <div className="flex-center lg:max-w-[800px] max-w-[400px] mx-auto">
              <p
                className="mb-5 lead text-center"
                style={{
                  fontSize: "25px",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                It only takes seconds. Your contribution is{" "}
                <strong>100% anonymous No names, no tracking </strong>— just the
                raw numbers that help everyone.{" "}
              </p>
            </div>
            <ButtonStyled openModal={true} bgColor="#b59658">
              🔓 Unlock Salary Data →
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
          <div className="flex flex-col items-center justify-center lg:mt-[7rem] lg:pb-14">
            <h1 className="display-3 fw-bolder text-white mt-5 mb-5 text-center max-w-[850px] mx-aut">
              Get Salary Trends & <br /> Industry Insights Monthly{" "}
            </h1>
            <div className="flex justify-center w-full">
              <iframe
                src="https://embeds.beehiiv.com/8e601ff8-0da2-4be5-ae6a-34be5be2e922?slim=true"
                data-test-id="beehiiv-embed"
                height="52"
                frameBorder="0"
                scrolling="no"
                className="m-0 !rounded-none bg-transparent w-full lg:max-w-[500px] max-w-[350px]"
              />
            </div>
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
