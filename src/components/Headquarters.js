import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";

function Headquarters({ hosts, areas, selectedHost, updateHostArea, setHostActiveTrueFalse, selectHost, dropdownAssignedArea, activeSelected, logs, activateAll, updateActivateAll }) {

  return (
    <Grid celled="internally">
      <Grid.Column width={8}><ColdStorage hosts = {hosts} selectedHost = {selectedHost} selectHost = {selectHost} /></Grid.Column>
      <Grid.Column width={5}>
        <Details selectedHost = {selectedHost} areas = {areas} dropdownAssignedArea = {dropdownAssignedArea} updateHostArea = {updateHostArea} activeSelected = {activeSelected} setHostActiveTrueFalse = {setHostActiveTrueFalse} activateAll = {activateAll} updateActivateAll = {updateActivateAll} />
      </Grid.Column>
      <Grid.Column width={3}>
          <LogPanel logs = {logs} activateAll = {activateAll} updateActivateAll = {updateActivateAll} />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
