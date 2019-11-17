import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

/**
 * 
 * @param {{
 *          onClick: function, 
 *          className: string
 *        }} props
 */
export function AddButton(props) {
    return (
        <Button 
            variant="contained"
            startIcon={ <AddIcon /> }
            onClick = { props.onClick }
            className={ props.className }
        >
            Add
        </Button>
    );
}

/**
 * 
 * @param {{
 *          onClick: function, 
 *          className: string
 *        }} props
 */
export function EditButton(props) {
    return (
        <Button
            variant="outlined"
            startIcon={ <EditIcon /> }
            onClick = { props.onClick }
            className={ props.className }
        >
            Edit
        </Button>
    );
}

/**
 * 
 * @param {{
 *          onClick: function, 
 *          className: string
 *        }} props
 */
export function DeleteButton(props) {
    return (
        <Button
            variant="contained"
            startIcon={ <DeleteIcon /> }
            onClick = { props.onClick }
            className={ props.className }
        >
            Delete
        </Button>
    );
}

/**
 * 
 * @param {{
 *          onClick: function, 
 *          className: string
 *        }} props
 */
   export function LoginButton(props) {
       return (
           <Button
               variant="contained"
               onClick = { props.onClick }
               className={ props.className }
           >
               Login
           </Button>
       );
   }