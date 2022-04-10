import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createProposal } from "../Components/proposal";
import { TEMPExecutionSc } from "../network";
import { OllieDAOSc } from "../network";
import { getVerifiedExecutionContracts } from "../Components/ollieDao";
import { getExecutionName } from "../Components/execute";

const Propose = () => {
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const { daoAddress } = useParams();
  const [executors, setExecutors] = useState([]);
  const [selectedContract, setSelectedContract] = useState();

  useEffect(() => {
    async function inner() {
      let allExecution = [];
      const response = await getVerifiedExecutionContracts(OllieDAOSc);
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        let exeName = await getExecutionName(response[i]);
        let execution = {
          contract: response[i],
          name: exeName,
        };
        allExecution.push(execution);
      }
      //console.log(allExecution);
      setExecutors(allExecution);

      //console.log(executors);
    }
    inner();
  }, []);
  useEffect(() => console.log(executors), [executors]);

  //   useEffect(() => {
  //     async function fetchData() {
  //       let allExecution = [];
  //       const response = await getVerifiedExecutionContracts(OllieDAOSc);
  //       console.log(response);
  //       for (let i = 0; i < response.length; i++) {
  //         let exeName = await getExecutionName(response[i]);
  //         let execution = {
  //           contract: response[i],
  //           name: exeName,
  //         };
  //         allExecution.push(execution);
  //       }
  //       console.log(allExecution);
  //       setExecutors(allExecution);

  //       console.log(executors);
  //     }
  //     fetchData();
  //   }, []);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeDetails = (event) => {
    setDetails(event.target.value);
  };

  const handleDropDownChange = (event) => {
    setDetails(event.target.value);
  };

  const handleButtonClick = async () => {
    const response = await createProposal(
      daoAddress,
      title,
      details,
      "0",
      0,
      TEMPExecutionSc,
      0
    );
    console.log(response);
  };
  return (
    <Box>
      <Box>
        <Box sx={{ p: 10 }}>
          <TextField
            sx={{ width: 1000, margin: 3 }}
            required
            id="outlined-required"
            label="Proposal Title"
            onChange={handleChangeTitle}
          />
          <TextField
            sx={{ width: 1000, margin: 3 }}
            required
            id="outlined-multiline-static"
            label="Proposal Details"
            multiline
            rows={4}
            onChange={handleChangeDetails}
          />
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Executor Smart Contract
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={0}
                label="Age"
                onChange={handleDropDownChange}
              >
                {executors.map((executor) => {
                  <MenuItem value={executor.contract}>
                    {executor.name}
                  </MenuItem>;
                })}
              </Select>
            </FormControl>
            <Button
              onClick={handleButtonClick}
              variant="contained"
              sx={{ margin: 3 }}
            >
              Create Proposal
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Propose;
