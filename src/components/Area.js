import React from "react";
import "../stylesheets/Area.css";
import HostList from "./HostList";

function Area( {area, hosts, selectedHost, selectHost} ) {
  return (
    <div
      className="area"
      id={area.name}
    >
      <h3 className="labels">
        {area.name.replaceAll("_", " ").split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
        {/* Don't just pass in the name from the data...clean that thing up */}
      </h3>
      <HostList hosts = {hosts} selectedHost = {selectedHost} selectHost = {selectHost} />
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
