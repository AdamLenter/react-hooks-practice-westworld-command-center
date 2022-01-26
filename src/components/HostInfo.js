import React from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({ selectedHost, areas, dropdownAssignedArea, updateHostArea, activeSelected, setHostActiveTrueFalse }) {
  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.

  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  let displayedOptions = {};

  if(areas.length > 0) {
    displayedOptions = areas.map((area)=> {
      return(
        {
        key: area.name, 
        text: area.name.replaceAll("_", " ").split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' '), 
        value: area.name
        }
      )
    })
  }

  function handleAreaChange(e, { value }) {
    updateHostArea(selectedHost, value);
  }

  function handleRadioChange() {
    setHostActiveTrueFalse(selectedHost, !activeSelected);
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={selectedHost.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {selectedHost.firstName} | {selectedHost.gender === "Male" ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={"Active"}
                checked={activeSelected}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleAreaChange}
              value={dropdownAssignedArea}
              options={displayedOptions}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
