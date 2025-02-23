import { Typography, Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DrawerAppBar from "./AppBar";

const About = () => {
  return (
    <Box sx={{ backgroundColor: "black", maxWidth: "100%" }}>
      <DrawerAppBar />
      <Box
        sx={{
          maxWidth: "750px",
          margin: "0 auto",
          padding: "0 20px",
          color: "white",
        }}
      >
        <Typography variant="h3" sx={{ my: "100px" }}>
          About
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          My name is Chris Holtzhauer, and I've spent years watching attorneys
          and firms struggle to figure out where to come in on salary—I built
          ClearWage to fix that.
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          Let's be real. Nobody talks about attorney salaries. It's all
          whispers, vague guesses, and "it depends." Meanwhile, some attorneys
          are underpaid and don't even know it, while others are negotiating
          blind, hoping they don't leave money on the table.
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          That's exactly why ClearWage exists.
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          <strong>Here's how it works:</strong> You anonymously share your
          salary info, and in return, you get access to everyone else's. No
          games. No BS. Just real numbers from real attorneys, so you can see
          exactly where you stand in the market.
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          I run <strong>Holtz & Bernard</strong>, an attorney placement firm, and
          I've seen firsthand how little transparency there is when it comes to
          pay. Firms are guessing. Lawyers are guessing. And that's a problem.
          When you don't know what the market is paying, you can't negotiate
          effectively, and firms can't compete fairly.
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          The solution? <strong>Real salary data straight from the source—you.</strong>
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          So if you want access to real salary insights, take 60 seconds, drop
          your numbers in, and unlock the data.
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          No fluff. No fees. Just the truth.
        </Typography>

        <Typography paragraph sx={{ mb: 6 }}>
          Welcome to Clear Wage.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ mb: "100px" }}
        >
          Back To Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default About;
