import React, { useEffect, useState, useRef } from "react";
import { useStepData } from "../../context/stepsData";
import {
  useMediaQuery,
  useTheme,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  Typography,
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
  const [hasContributed, setHasContributed] = useState(() => {
    // Get initial value from localStorage, default to false if not found
    return localStorage.getItem("hasContributed") === "true";
  });
  const lastSectionRef = useRef(null);
  const [shouldReload, setShouldReload] = useState(0);
  const [filters, setFilters] = useState({
    jdYear: "",
    practiceArea: "",
    firmSize: "",
    dateOfEntry: "",
  });

  // Update localStorage whenever hasContributed changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Force re-check of localStorage value
            setHasContributed(
              localStorage.getItem("hasContributed") === "true"
            );
            setShouldReload((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (lastSectionRef.current) {
      observer.observe(lastSectionRef.current);
    }

    return () => {
      if (lastSectionRef.current) {
        observer.unobserve(lastSectionRef.current);
      }
    };
  }, []);

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

  // Add unique values for dropdown options
  const getUniqueValues = (field) => {
    return [...new Set(tableData.map((item) => item[field]))]
      .filter(Boolean)
      .sort();
  };

  // Modified filter logic to handle multiple filters
  const filteredData = tableData.filter((row) => {
    // First apply dropdown filters
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // Skip empty filters

      switch (key) {
        case "jdYear":
          return row.JDYear.toString() === value;
        case "practiceArea":
          return row.PracticeArea === value;
        case "firmSize":
          return row.FirmSize === value;
        case "dateOfEntry":
          return (
            new Date(row.Date_Documented).getFullYear().toString() === value
          );
        default:
          return true;
      }
    });

    if (!matchesFilters) return false;

    // Then apply search query filter
    if (!searchQuery) return true;

    const keywords = searchQuery.toLowerCase().split(", ");
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
        row.JDYear.toString().toLowerCase().includes(keyword)
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
    } else if (sortField === "Date") {
      // Parse dates before comparison
      const dateA = a.Date_Documented
        ? new Date(a.Date_Documented)
        : new Date("1970-01-01"); // Move empty dates to the start
      const dateB = b.Date_Documented
        ? new Date(b.Date_Documented)
        : new Date("1970-01-01");
      return dateB - dateA; // Reverse date order, newest first
    } else {
      return a[sortField].localeCompare(b[sortField]);
    }
  });

  return (
    <div id="last" ref={lastSectionRef}>
      {!hasContributed ? (
        <div style={{ textAlign: "center", width: "100%" }}></div>
      ) : (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
            margin: isMobile ? "20px 5px" : "50px ",
          }}
        >
          <Typography sx={{ fontSize: "14px", color: "black" }}>
            Separate keywords by commas to narrow your search <br />
            <span style={{ fontSize: "10px" }}>
              For Example: 2018, Commercial Litigation, Associate
            </span>
          </Typography>

          <div
            style={{ width: isMobile ? "80%" : "30%", position: "relative" }}
          >
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
              width: isMobile ? "80%" : "100%",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "10px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {/* JD Year Filter */}
            <FormControl
              size="small"
              sx={{ minWidth: isMobile ? "100%" : "200px" }}
            >
              <InputLabel>JD Year</InputLabel>
              <Select
                value={filters.jdYear}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, jdYear: e.target.value }))
                }
                label="JD Year"
              >
                <MenuItem value="">All</MenuItem>
                {[
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                ].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Practice Area Filter */}
            <FormControl
              size="small"
              sx={{ minWidth: isMobile ? "100%" : "200px" }}
            >
              <InputLabel>Practice Area</InputLabel>
              <Select
                value={filters.practiceArea}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    practiceArea: e.target.value,
                  }))
                }
                label="Practice Area"
              >
                <MenuItem value="">All</MenuItem>
                {[
                  "Insurance Defense Litigation",
                  "Corporate",
                  "Civil Litigation",
                  "Commercial Litigation",
                  "Banking",
                  "Insurance",
                  "Bankruptcy",
                  "Education",
                  "Energy",
                  "Environment",
                  "ERISA",
                  "General Practice",
                  "Government",
                  "Healthcare",
                  "Immigration",
                  "Information Technology",
                  "Intellection Property",
                  "Labor & Employment",
                  "Real Estate",
                  "Tax",
                  "Transportation",
                  "Trusts & Estates",
                  "Other",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Firm Size Filter */}
            <FormControl
              size="small"
              sx={{ minWidth: isMobile ? "100%" : "200px" }}
            >
              <InputLabel>Firm Size</InputLabel>
              <Select
                value={filters.firmSize}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, firmSize: e.target.value }))
                }
                label="Firm Size"
              >
                <MenuItem value="">All</MenuItem>
                {getUniqueValues("FirmSize").map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Date of Entry Filter */}
            <FormControl
              size="small"
              sx={{ minWidth: isMobile ? "100%" : "200px" }}
            >
              <InputLabel>Date of Entry</InputLabel>
              <Select
                value={filters.dateOfEntry}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateOfEntry: e.target.value,
                  }))
                }
                label="Date of Entry"
              >
                <MenuItem value="">All</MenuItem>
                {["2025", "2024", "2023", "2022", "2021", "2020"].map(
                  (year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </div>
          {isMobile && (
            <Typography sx={{ fontSize: "12px", color: "black" }}>
              Shift your phone horizontally to view full data.
            </Typography>
          )}

          <ul
            className="tables"
            style={{
              listStyleType: "none",
              padding: 0,
              border: "1px solid black",
              width: isMobile ? "100%" : "100%",
              marginTop: isMobile ? "10px" : "0",
            }}
          >
            <li
              className="header"
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
                  <span>Salary</span>
                  <span>Bonus</span>
                  <span>Practice Area</span>
                  <span>Firm Size</span>
                </>
              )}
              {!isMobile && (
                <>
                  <span>JD Year</span>
                  <span>Salary</span>
                  <span>Bonus</span>
                  <span>Practice Area</span>
                  <span>Firm Size</span>
                  <span>Title</span>
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
                  <span style={{ textAlign: "right" }}>
                    {rowData.Salary.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                  <span style={{ textAlign: "right" }}>
                    {rowData.Bonuses.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>

                  <span style={{ textAlign: "left" }}>
                    {rowData.PracticeArea}
                  </span>
                  <span style={{ textAlign: "center" }}>
                    {rowData.FirmSize}
                  </span>

                  {!isMobile && (
                    <span style={{ textAlign: "left" }}>{rowData.Title}</span>
                  )}
                  {!isMobile && (
                    <span style={{ textAlign: "left" }}>{rowData.City}</span>
                  )}
                  {!isMobile && (
                    <>
                      <span style={{ textAlign: "left" }}>{rowData.State}</span>
                      <span style={{ textAlign: "left" }}>
                        {rowData.Gender}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        {rowData.Date_Documented
                          ? new Date(
                              rowData.Date_Documented
                            ).toLocaleDateString("en-US", {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            })
                          : "-"}
                      </span>
                    </>
                  )}
                </li>
              ))
            )}
            {!loading && sortedData.length === 0 && (
              <li
                style={{ padding: "10px 0", color: "black", fontSize: "14px" }}
              >
                No Data found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Results;
