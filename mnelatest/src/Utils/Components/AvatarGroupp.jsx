import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function MemberAvatar({members}) {


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
  return (
    <AvatarGroup total={members.length}>
         {members.length>4?(members.slice(0,3).map((member,index)=>(
        <Avatar  {...stringAvatar(member?.user_name)} /> 
      ))):(members.map((member,index)=>{
        
        return(
        
        <Avatar  {...stringAvatar(member?.user_name)} /> 
      )})
      
      )}
      {/* <Avatar  {...stringAvatar("Winnie Kagendo")} /> 
      <Avatar {...stringAvatar("Travis Howard")} />
      <Avatar {...stringAvatar("Aggie K")} />
      <Avatar {...stringAvatar("Christine Kendi")} /> */}
    </AvatarGroup>
  );
}