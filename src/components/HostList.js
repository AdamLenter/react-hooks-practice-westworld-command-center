import React from "react";
import { Card } from "semantic-ui-react";

function HostList({hosts, selectedHost, selectHost} ) {
  function handleSelectHost(host, active) {
    selectHost(host)
  }

  return (
    <Card.Group itemsPerRow={6}>
      {hosts.map((host)=> {
        return(
          <Card
          key = {host.id}
          className={host.id === selectedHost.id ? "selected host" : "host"}
          image={host.imageUrl}
          onClick={()=>handleSelectHost(host)}
          raised
          link
        />)
      })
    }
    </Card.Group>
  );
}

export default HostList;
