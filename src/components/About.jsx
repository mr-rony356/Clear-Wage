import { Typography, Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DrawerAppBar from "./AppBar";
import CompanyFooter from "./CompanyFooter";

const About = () => {
  return (
    <Box>
      <DrawerAppBar />
      <Box
        sx={{
          margin: "0 auto",
          color: "white",
        }}
      >
        <h1 className="lg:text-[80px] text-[46px] font-bold  my-24 text-center">
          About ClearWage
        </h1>
        <div className="flex justify-center bg-white px-4 lg:px-0">
          <div className="text-[20px] font-normal leading-[30px] bg-white text-black max-w-[600px] mx-auto">
            <h1 className="lg:text-[56px] text-[36px] font-bold mb-10 mt-30 text-center">
              About
            </h1>

            <p className="lead mb-5 op-9 text-[18px] font-[300] text-center">
              My name's Chris Holtzhauer, founder of ClearWage. After years of
              working with attorneys and watching them struggle to figure out
              what they should be earning, I built ClearWage to solve the
              problem.
              <br />
              <br />
              Let's be real: nobody talks about salaries. It's all whispers,
              vague guesses, and the dreaded: "It depends."
              <br />
              <br />
              Here's what that leads to: Some attorneys are getting underpaid
              and don't even realize it. Others are walking into negotiations
              blind — hoping they don't leave money on the table.
              <br />
              <br />
              That's insane. And that's why ClearWage exists. Here's how it
              works: You share your salary anonymously. In return, you get
              access to real data from other attorneys. No guesses. Just real
              numbers from real people.
              <br />
              <br />
              Without salary transparency, you can't negotiate effectively — and
              firms can't compete fairly.
              <br />
              <br />
              So if you want access to real salary insights, take 60 seconds,
              drop your numbers in, and unlock the data.
              <br />
              <br />
              No email form. No fees. Just the data.
              <br />
              <br />
              Welcome to ClearWage.
            </p>
            {/* <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{
                mb: "100px",
                bgcolor: "#f5f5f5",
                color: "black",
                "&:hover": {
                  bgcolor: "#e0e0e0",
                },
              }}
            >
              Back To Home Page
            </Button> */}
          </div>
        </div>
      </Box>
      <CompanyFooter />
    </Box>
  );
};

export default About;
