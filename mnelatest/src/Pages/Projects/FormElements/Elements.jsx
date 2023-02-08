import React from 'react'
import { Inputf } from './Input';
import SelectF from './SelectF';
import FileF from './FileF';

export default function Elements({ field }) {
    console.log("field", field.type)
    switch (field.type) {
        case "text":
            return (<Inputf field={field} />)

            break;
            case "file":
                return (<Inputf field={field} />)
    
                break;
            case "email":
                return (<Inputf field={field} />)
    
                break;
        case "number":
            return (<Inputf field={field} />)

            break;
            case "textarea":
                return (<Inputf field={field} />)
    
                break;
        case "password":
            return (<Inputf field={field} />)

            break;
            case "select":
                return (<SelectF field={field} />)
    
                break;
                case "null":
                    return (<FileF field={field} />)
        
                    break;
        // case "checkbox":
        //     return <Check field={field}/>
        //     break;
        // case "select":
        //     return <Select field={field}/>
        //     break;

        default:
            return null
            break;
    }
}
