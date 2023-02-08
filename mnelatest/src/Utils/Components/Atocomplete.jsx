import { Box, TextField } from '@mui/material';
import React, { useState } from 'react'
import PlacesAutoComplete,{geocodeByAddress,getLatLng} from 'react-places-autocomplete'

function AutoComplete({addressData}) {
    const [address, setAddress] = React.useState("");
    const [latitude , setLatitude] = React.useState("");
    const [longitude , setLongitude] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null
    });
  
    const handleSelect = async value => {
      const results = await geocodeByAddress(value);
      console.log("results",results[0].formatted_address)
      setAddress(results[0].formatted_address);
      const latLng = await getLatLng(results[0]).then((latLng,value)=>{
        // setAddress(value);
      setCoordinates(latLng);
      console.log("coordinates",address)
      console.log("latLng",latLng)
      addressData(latLng,address)
      })
      
    };

    
  return (
    <div class="col-xl-12  mb-3">
      
      <PlacesAutoComplete
        value={
          address}
        onChange={setAddress}
        
        // onChange={(e)=>{console.log("latitude",coordinates.lat)}} 
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* {coordinates.lat && (
              <Box class="mb-3" >
                
                <TextField sx={{ display: 'none' }}
                variant='outlined'
                label="Latitude"
                id="latitude"
                name="latitude"
                class="form-control" 
                // onChange={(e)=>{setLatitude(coordinates.lat)}}
                onChange={(e)=>{console.log("latitude",coordinates.lat)}} 
                value={coordinates.lat}
                />
              </Box>
             
            )}
          
              {coordinates.lng && (
                <Box class="mb-3"  >
                   <label class="form-label">longitude</label>
                   <TextField sx={{ display: 'none' }}
                   variant='outlined'
                   label="Longitude"
                  id="longitude"
                  name="longitude"
                  class="form-control" 
                  onChange={(e)=>{setLongitude(coordinates.lng)}}
                  value={coordinates.lng}
                  /> 
                </Box>
                  
              )}
           */}

            <TextField
            
            fullWidth
             {...getInputProps({ 
              type: "text",
              label:"Location",
              variant:'outlined' ,
              placeholder: "Type address",
              
              
              // id:"address",
              // name:"address"
           })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion,index) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutoComplete>
  </div>
  )
}

export default AutoComplete