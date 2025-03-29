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
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  const [isScrolling, setIsScrolling] = useState(false);
  const tableRef = useRef(null);
  const startX = useRef(0);
  const [page, setPage] = useState(1);
  const rowsPerPage = 25;

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

  // Modify the sortedData to only show last 100 results
  const limitedData = sortedData.slice(-100);

  // Calculate pagination
  const totalPages = Math.ceil(limitedData.length / rowsPerPage);
  const currentPageData = limitedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Modify firm size display
  const simplifyFirmSize = (size) => {
    const sizeMap = {
      "Boutique (1-20 attorneys)": "Boutique",
      "Mid-size (21-100 attorneys)": "Mid-size",
      "Large (101+ attorneys)": "Large",
      Am100: "Am100",
      Am200: "Am200",
    };
    return sizeMap[size] || size;
  };

  // Add touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!tableRef.current) return;

    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;
    tableRef.current.scrollLeft += diff;
    startX.current = currentX;

    if (!isScrolling) setIsScrolling(true);
  };

  const handleTouchEnd = () => {
    setIsScrolling(false);
  };

  // Add these styles
  const headerCellStyle = {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "transparent",
    fontSize: isMobile ? "11px" : "14px",
    padding: isMobile ? "8px 4px" : "16px 8px",
  };

  const bodyCellStyle = {
    color: "white",
    fontSize: isMobile ? "11px" : "14px",
    padding: isMobile ? "8px 4px" : "16px 8px",
  };

  // Replace the existing table JSX with this new version
  const renderTable = () => (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#1a1a1a",
        maxWidth: isMobile ? "100vw" : "100%",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headerCellStyle}>JD Year</TableCell>
            <TableCell sx={headerCellStyle}>Salary</TableCell>
            <TableCell sx={headerCellStyle}>Bonus</TableCell>
            <TableCell sx={headerCellStyle}>Practice Area</TableCell>
            <TableCell sx={headerCellStyle}>Firm Size</TableCell>
            <TableCell sx={headerCellStyle}>Title</TableCell>
            <TableCell sx={headerCellStyle}>City</TableCell>
            <TableCell sx={headerCellStyle}>State</TableCell>
            <TableCell sx={headerCellStyle}>Gender</TableCell>
            <TableCell sx={headerCellStyle}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={10} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            currentPageData.map((rowData, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#333333",
                  "&:hover": { backgroundColor: "#404040" },
                }}
              >
                <TableCell sx={bodyCellStyle}>{rowData.JDYear}</TableCell>
                <TableCell sx={bodyCellStyle}>
                  {rowData.Salary.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </TableCell>
                <TableCell sx={bodyCellStyle}>
                  {rowData.Bonuses.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </TableCell>
                <TableCell sx={bodyCellStyle}>{rowData.PracticeArea}</TableCell>
                <TableCell sx={bodyCellStyle}>
                  {simplifyFirmSize(rowData.FirmSize)}
                </TableCell>
                <TableCell sx={bodyCellStyle}>{rowData.Title}</TableCell>
                <TableCell sx={bodyCellStyle}>{rowData.City}</TableCell>
                <TableCell sx={bodyCellStyle}>{rowData.State}</TableCell>
                <TableCell sx={bodyCellStyle}>{rowData.Gender}</TableCell>
                <TableCell sx={bodyCellStyle}>
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
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div id="last" ref={lastSectionRef}>
      {!hasContributed ? (
        <div style={{ textAlign: "center", width: "100%" }}></div>
      ) : (
        <div
          style={{
            position: "relative",
            display: "flex",
            backgroundColor: "white",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
            margin: isMobile ? "20px 5px" : "50px 0 ",
          }}
        >
          <Typography
            sx={{ fontSize: "20px", color: "black", marginTop: "20px" }}
          >
            Separate keywords by commas to narrow your search
          </Typography>
          {!isMobile && (
            <Typography
              sx={{ fontSize: "56px", color: "black", fontWeight: "bold" }}
            >
              {filteredData.length} Results
            </Typography>
          )}
          <div
            style={{ width: isMobile ? "80%" : "30%", position: "relative" }}
          >
            <TextField
              fullWidth
              placeholder={
                isMobile
                  ? "Search keywords..."
                  : "Search keywords eg: 2018, Commercial Litigation, Associate"
              }
              value={searchQuery}
              size="medium"
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  borderRadius: "50px",
                  padding: "5px",
                  "&::placeholder": {
                    fontSize: isMobile ? "8px" : "14px",
                  },
                },
              }}
            />
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
                  "Before 2000",
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
                  "Banking",
                  "Bankruptcy",
                  "Civil Litigation",
                  "Commercial Litigation",
                  "Construction Litigation",
                  "Corporate (Transactional)",
                  "Education",
                  "Energy",
                  "Environment",
                  "ERISA",
                  "Family",
                  "Financial Services Litigation",
                  "First Party Property Defense",
                  "General Practice",
                  "Government",
                  "Healthcare",
                  "Immigration",
                  "Information Technology",
                  "Insurance",
                  "Insurance Coverage",
                  "Insurance Defense Litigation",
                  "Insurance Plaintiffs",
                  "Intellection Property",
                  "Labor & Employment",
                  "Medical Malpractice Defence",
                  "Medical Malpractice Plaintiffs",
                  "Personal Injury Plaintiffs",
                  "Property Damage Plaintiffs",
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
                {[
                  "Boutique (1-20 attorneys)",
                  "Mid-size (21-100 attorneys)",
                  "Large (101+ attorneys)",
                  "Am100",
                  "Am200",
                ].map((size) => (
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
            <div style={{ width: "100%", textAlign: "center" }}>
              <Typography
                sx={{ fontSize: "40px", color: "black", fontWeight: "bold" }}
              >
                {filteredData.length} Results
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "black" }}>
                Swipe left to view full data
              </Typography>
            </div>
          )}

          <div
            ref={tableRef}
            style={{
              width: "100%",
              overflowX: isMobile ? "auto" : "visible",
              WebkitOverflowScrolling: "touch",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {renderTable()}
          </div>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{
              marginTop: "20px",
              "& .MuiPaginationItem-root": {
                color: "white",
                backgroundColor: "#808080",
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "#4739ff",
              },
              "& .MuiPaginationItem-page:hover": {
                backgroundColor: "#4739ff",
                opacity: 0.8,
              },
              "& .MuiPaginationItem-previousNext": {
                backgroundColor: "#4739ff",
                borderRadius: "50%",
                "&:hover": {
                  opacity: 0.8,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Results;
