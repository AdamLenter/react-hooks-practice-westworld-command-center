import React from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({areas, areasLoaded, hosts, selectedHost, selectHost}) {
  return <Segment id="map">{areasLoaded ? areas.map((area) => <Area key = {area.id} area = {area} hosts = {hosts.filter((host) => host.area === area.name)} selectedHost = {selectedHost} selectHost = {selectHost} />) : null}</Segment>;
}

export default WestworldMap;
