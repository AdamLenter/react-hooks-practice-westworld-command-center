import React from "react";
import { Segment } from "semantic-ui-react";
import Host from "./Host";

function ColdStorage( {hosts, selectedHost, selectHost} ) {
  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        {hosts.map((host) => <Host key = {host.id} host = {host} selectedHost = {selectedHost} selectHost = {selectHost} />)}
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
