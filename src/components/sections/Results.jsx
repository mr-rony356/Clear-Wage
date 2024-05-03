import React, { useEffect, useState } from "react";
import { useStepData } from "../../context/stepsData";
import {
  useMediaQuery,
  useTheme,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputLabel } from "@mui/material";

const Results = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tableData, setTableData] = useState([]);
  const { stepData } = useStepData();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(""); // Define sortField state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxWJzD7pTYLpFvgi_Y7PuLhKCpbUAW9FR_TLupd-HoIkJVqcknqw7KRfrWf3O5XxsU/exec"
        );
        const data = await response.json();
        setTableData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [stepData]);
  // Filter table data based on the search query
  const filteredData = tableData.filter((row) => {
    // Convert search query into an array of lowercase keywords
    const keywords = searchQuery.toLowerCase().split(", ");

    // Check if all keywords are present in any field of the row
    return keywords.every(
      (keyword) =>
        row.FirmName.toLowerCase().includes(keyword) ||
        row.Title.toLowerCase().includes(keyword) ||
        row.PracticeArea.toLowerCase().includes(keyword) ||
        row.State.toLowerCase().includes(keyword) ||
        row.City.toLowerCase().includes(keyword) ||
        row.Salary.toString().toLowerCase().includes(keyword) ||
        row.Bonuses.toString().toLowerCase().includes(keyword) ||
        row.Gender.toLowerCase().includes(keyword) ||
        row.JDYear.toString().toLowerCase().includes(keyword) ||
        row.Ethnicity.toLowerCase().includes(keyword)
    );
  });

  // Sort table data based on the selected option
  const sortedData = filteredData.sort((a, b) => {
    if (!sortField) {
      // Return the data as it is if sortField is empty
      return 0;
    }

    if (
      sortField === "Salary" ||
      sortField === "Bonuses" ||
      sortField === "JDYear"
    ) {
      return parseFloat(a[sortField]) - parseFloat(b[sortField]);
    } else {
      return a[sortField].localeCompare(b[sortField]);
    }
  });

  return (
    <div
      id="last"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        textAlign: "center",
        margin: isMobile ? "20px 5px" : "50px ",
      }}
    >
      <div style={{ width: isMobile ? "80%" : "30%", position: "relative" }}>
        <TextField
          fullWidth
          placeholder="Search..."
          value={searchQuery}
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon
          sx={{
            color: "black",
            position: "absolute",
            right: "2%",
            top: "8px",
          }}
        ></SearchIcon>
      </div>
      <div style={{ width: "100%", height: "25px", textAlign: "right" }}>
          <Select
            value={sortField}
            placeholder="Sort By"
            onChange={(e) => setSortField(e.target.value)}
            fullWidth
            size="small"
            sx={{
              width: isMobile ? "25%" : "10%",
              color: "black",
            }}
            inputProps={{
              style: { color: "black" }, // Set the color of the placeholder text
            }}
          >
            <MenuItem value="">Filter By</MenuItem>
            <MenuItem value="Title">Title</MenuItem>
            <MenuItem value="PracticeArea">Practice Area</MenuItem>
            <MenuItem value="JDYear">JD Year</MenuItem>
            <MenuItem value="State">State</MenuItem>
            <MenuItem value="City">City</MenuItem>
            <MenuItem value="Salary">Salary (Low to High)</MenuItem>
            <MenuItem value="Bonuses">Bonuses (Low to High)</MenuItem>
            <MenuItem value="Gender">Gender</MenuItem>
            {/* Add more sorting options if needed */}
          </Select>
      </div>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          border: "1px solid black",
          width: isMobile ? "100%" : "100%",
          marginTop: isMobile ? "10px" : "0",
        }}
      >
        <li
          style={{
            fontWeight: "bold",
            display: "flex",
            borderBottom: "1px solid black",
            padding: "10px 0",
            color: "black",
            fontSize: isMobile ? "9px" : "14px",
          }}
        >
          <span style={{ flex: 2 }}>JD Year</span>
          <span style={{ flex: 2 }}>Practice Area</span>
          <span style={{ flex: 2 }}>Title</span>
          <span style={{ flex: 2 }}>Salary</span>
          <span style={{ flex: 2 }}> Bonus</span>
          <span style={{ flex: 2 }}> City</span>
          <span style={{ flex: 2 }}> State</span>
          <span style={{ flex: 2 }}> Gender</span>
          <span style={{ flex: 2 }}> Date Documented</span>
        </li>
        {loading ? (
          <div className="flex-center" style={{ height: "80px" }}>
            <CircularProgress />
          </div>
        ) : (
          sortedData.map((rowData, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                borderBottom: "1px solid black",
                padding: "10px 0",
                color: "black",
                fontSize: isMobile ? "8px" : "14px",
              }}
            >
              <span style={{ flex: 2 }}>{rowData.JDYear}</span>
              <span style={{ flex: 2 }}>{rowData.PracticeArea}</span>
              <span style={{ flex: 2 }}>{rowData.Title}</span>
              <span style={{ flex: 2 }}>
                {rowData.Salary.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              <span style={{ flex: 2 }}>
                {rowData.Bonuses.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>

              <span style={{ flex: 2 }}>{rowData.City}</span>
              <span style={{ flex: 2 }}>{rowData.State}</span>
              <span style={{ flex: 2 }}>{rowData.Gender}</span>
              <span style={{ flex: 2 }}>
                {rowData.Date_Documented
                  ? new Date(rowData.Date_Documented).toLocaleDateString(
                      "en-GB"
                    )
                  : "-"}
              </span>
            </li>
          ))
        )}
        {!loading && sortedData.length === 0 && (
          <li style={{ padding: "10px 0", color: "black", fontSize: "14px" }}>
            {" "}
            No Data found
          </li>
        )}
      </ul>
    </div>
  );
};

export default Results;
