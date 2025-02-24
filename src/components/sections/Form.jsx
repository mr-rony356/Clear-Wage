import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Subtitle, Title } from "../HeroSection";
import { useTheme, useMediaQuery, Button } from "@mui/material";
import ButtonStyled from "../ButtonWrapper ";

const MiuiSection = styled(Box)({
  background: "#022124",
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
    <MiuiSection>
      <Box
        sx={{
          maxWidth: isMobile ? "95%" : "70%",
        }}
      >
        {!hasContributed ? (
          <>
            <Box sx={{ maxWidth: "850px", margin: "0 auto" }}>
              <Title>
                {totalEntries.toLocaleString()} attorneys (and counting) have
                shared their salaries to create the most powerful attorney
                salary database
              </Title>
            </Box>
            <div className="flex-center">
              <Subtitle style={{ maxWidth: "650px" }}>
                <strong>
                  See How Your Salary Stacks Up Against Other Attorneys
                </strong>
                <br /> <br />
                It only takes seconds. Your contribution is 100% anonymous. No
                names, no tracking—just the raw numbers that help everyone. And
                the knowledge you gain could mean thousands more in your next
                paycheck. <br /> <br /> Don't be left in the dark—Enter your
                salary now and unlock instant access.
              </Subtitle>
            </div>
            <ButtonStyled openModal={true} bgColor="#b59658">
              Unlock Salary Data Now →
            </ButtonStyled>
            <div
              onClick={handleContributionStatus}
              style={{
                fontSize: ".8rem",
                fontWeight: "bold",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              I already added my salary →
            </div>
          </>
        ) : (
          <>
            <h1
              style={{
                fontWeight: "bold",
                color: "#b59658",
                fontSize: isMobile ? "1.5rem" : "2rem",
                marginBottom: "10px",
              }}
            >
              Get Exclusive Salary Trends & Industry Insights Monthly
            </h1>
            <i>
              <p style={{ fontSize: "12px", color: "white", marginBottom: "20px" }}>
                No spam, just pure value. Unsubscribe anytime.{" "}
              </p>
            </i>
            <iframe
              src="https://embeds.beehiiv.com/8e601ff8-0da2-4be5-ae6a-34be5be2e922?slim=true"
              data-test-id="beehiiv-embed"
              height="52"
              frameBorder="0"
              scrolling="no"
              style={{
                margin: 0,
                borderRadius: "0px !important",
                backgroundColor: "transparent",
                width: "100%",
                maxWidth: "500px",
              }}
            />
          </>
        )}
      </Box>
    </MiuiSection>
  );
}

export default Form;
