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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          position: "relative",
          height: "30px",
        }}
      >
        <FormControl
          size="small"
          sx={{
            width: isMobile ? "25%" : "120px",
            position: "absolute",
            top: "0px",
            right: "0px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            name="sortField"
            label="Sort By"
            size="small"
            labelId="demo-simple-select-label"
            sx={{
              color: "black",
            }}
            inputProps={{
              style: { color: "black" }, // Set the color of the placeholder text
            }}
          >
            <MenuItem value="">None</MenuItem>
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
        </FormControl>
      </div>
      <div style={{ overflowY: "auto", maxHeight: "100vh", width: "100%" }}>
        <ul
          class="tables"
          style={{
            listStyleType: "none",
            padding: 0,
            border: "1px solid black",
            width: isMobile ? "100%" : "100%",
            marginTop: isMobile ? "10px" : "0",
          }}
        >
          <li
            class="header"
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              display: "flex",
              borderBottom: "1px solid black",
              fontSize: isMobile ? "11px" : "14px",
              textAlign: "center",
            }}
          >
            {isMobile && (
              <>
                <span>JD Year</span>
                <span>Practice Area</span>
                <span>Title</span>
                <span>Salary</span>
                <span>City</span>
              </>
            )}
            {!isMobile && (
              <>
                <span>JD Year</span>
                <span>Practice Area</span>
                <span>Title</span>
                <span>Salary</span>
                <span>Bonus</span>
                <span>City</span>
                <span>State</span>
                <span>Gender</span>
                <span>Date</span>
              </>
            )}
          </li>

          {loading ? (
            <div className="flex-center" style={{ height: "80px" }}>
              <CircularProgress />
            </div>
          ) : (
            sortedData.map((rowData, index) => (
              <li
                className="body"
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f5f7f9" : "white",
                  display: "flex",
                  borderBottom: "1px solid black",
                  color: "black",
                  fontSize: isMobile ? "11px" : "14px",
                }}
              >
                <span style={{ textAlign: "center" }}>{rowData.JDYear}</span>
                <span style={{ textAlign: "left" }}>
                  {rowData.PracticeArea}
                </span>
                <span style={{ textAlign: "left" }}>{rowData.Title}</span>
                <span style={{ textAlign: "right" }}>
                  {rowData.Salary.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
                {!isMobile && (
                  <span style={{ textAlign: "right" }}>
                    {rowData.Bonuses.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                )}
                <span style={{ textAlign: "left" }}>{rowData.City}</span>
                {!isMobile && (
                  <>
                    <span style={{ textAlign: "left" }}>{rowData.State}</span>
                    <span style={{ textAlign: "left" }}>{rowData.Gender}</span>
                    <span style={{ textAlign: "right" }}>
                      {rowData.Date_Documented
                        ? new Date(rowData.Date_Documented).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )
                        : "-"}
                    </span>
                  </>
                )}
              </li>
            ))
          )}
          {!loading && sortedData.length === 0 && (
            <li style={{ padding: "10px 0", color: "black", fontSize: "14px" }}>
              No Data found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Results;
