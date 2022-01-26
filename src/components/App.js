import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import { Log } from "../services/Log";

function App() {
  const [areas, setAreas] = useState([]);
  const [areasLoaded, setAreasLoaded] = useState(false);

  const [hosts, setHosts] = useState([]);
  
  useEffect(()=> {
    fetch("http://localhost:3001/areas")
      .then((r)=>r.json())
      .then((areaList) => setAreas(areaList))
      .then(()=>setAreasLoaded(true))  
      .then() 
      }, [])

  useEffect(()=> {
    fetch("http://localhost:3001/hosts")
      .then((r)=>r.json())
      .then((hostList) => setHosts(hostList))
      .then() 
      }, [])


  const [selectedHost, setSelectedHost] = useState({});
  const [dropdownAssignedArea, setDropDownAssignedArea] = useState(selectedHost.area);
  const [activeSelected, setActiveSelected] = useState(false);

  const [logs, setLogs] = useState([]);

  const [activateAll, setActivateAll] = useState(true);

  function selectHost(host) {
    setSelectedHost(host);
    setDropDownAssignedArea(host.area);
    setActiveSelected(host.active);
  }

  function updateHostInfo(newHostInfo) {
    fetch(`http://localhost:3001/hosts/${newHostInfo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(newHostInfo)
      })

    const newHostList = hosts.map((host)=> {
      if(host.id === newHostInfo.id) {
        return newHostInfo;
      }
      else {
        return host;
      }
    })

    setHosts(newHostList);
    setSelectedHost(newHostInfo);
  }
  
  function updateHostArea(hostToUpdate, newArea) {
    const newAreaInfo = areas.find((area)=>area.name === newArea);
    
    const hostsInArea = hosts.filter((host)=>host.area === newArea);
    
    let newLog;

    if((hostsInArea.length + 1) <= newAreaInfo.limit) { 
      setDropDownAssignedArea(newArea);

      let newHostInfo = {...hostToUpdate};
      newHostInfo.area = newArea;

      updateHostInfo(newHostInfo);
      newLog = Log.notify(`${hostToUpdate.firstName} set in area ${newArea.replaceAll("_", " ").split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}`)
    }
    else {
      newLog = Log.error(`Too many hosts. Cannot add ${hostToUpdate.firstName} to ${newArea}`);
    }
  updateLog(newLog);
  }

  function setHostActiveTrueFalse(hostToUpdate, active) {
    setActiveSelected(active);
  
    let newHostInfo = {...hostToUpdate};
    newHostInfo.active = active;

    updateHostInfo(newHostInfo)

    let newLog;

    if(active) {
      newLog = Log.warn(`Activated ${hostToUpdate.firstName}`);
    }
    else {
      newLog = Log.notify(`Decommissioned ${hostToUpdate.firstName}`);
    }
    updateLog(newLog);
  }

  function updateActivateAll(active) {
    const newHostList = hosts.map((host)=> {
      let newHostInfo = {...host}
      newHostInfo.active = active;

      fetch(`http://localhost:3001/hosts/${host.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(newHostInfo)
      })

      return newHostInfo
    })

    setHosts(newHostList);

    if(Object.keys(selectedHost).length > 0) {
      const updatedSelectedHost = {...selectedHost};
      updatedSelectedHost.active = active;
      setSelectedHost(updatedSelectedHost);
      setActiveSelected(active);
      }
    
    setActivateAll(!activateAll);

    let newLog;
    if(active) {
      newLog = Log.warn(`Activating all hosts!`);
    }
    else {
      newLog = Log.notify(`Decommissiong all hosts!`);
    }
    updateLog(newLog);
  }

  function updateLog(newLog) {
    let newLogs = [...logs, newLog];
    setLogs(newLogs);
  }

  const activeHosts = hosts.filter((host) => host.active);
  const inactiveHosts = hosts.filter((host) => host.active === false);

  return (
    <Segment id="app">
      <WestworldMap areas = {areas} areasLoaded = {areasLoaded} hosts = {activeHosts} selectedHost = {selectedHost} selectHost = {selectHost} />
      <Headquarters hosts = {inactiveHosts} areas = {areas} selectedHost = {selectedHost} updateHostArea = {updateHostArea} setHostActiveTrueFalse = {setHostActiveTrueFalse} selectHost = {selectHost} dropdownAssignedArea = {dropdownAssignedArea} activeSelected = {activeSelected} logs = {logs} activateAll = {activateAll} updateActivateAll = {updateActivateAll} />
    </Segment>
  );
}

export default App;
