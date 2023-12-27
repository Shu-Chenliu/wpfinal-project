"use client";
import { useState } from "react";


import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { Pencil } from 'lucide-react';



// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types
type NewCardDialogProps = {
  variant: "new";
  // listId: string;
};

type EditCardDialogProps = {
  variant: "edit";
  // listId: string;
  title?: string; //user name
  description?: string; 
  address?:string;
  
};

type CardDialogProps = NewCardDialogProps | EditCardDialogProps;

export default function EditProfile(props: CardDialogProps) {
  const { variant} = props;
  const title = variant === "edit" ? props.title : "";
  const description = variant === "edit" ? props.description : "";
  const address = variant === "edit" ? props.address : "";

  const [edittingTitle, setEdittingTitle] = useState(variant === "new");
  const [edittingDescription, setEdittingDescription] = useState(variant === "new");
  const [edittingAddress, setEdittingAddress] = useState(variant === "new");
 
  


  // using a state variable to store the value of the input, and update it on change is another way to get the value of a input
  // however, this method is not recommended for large forms, as it will cause a re-render on every change
  // you can read more about it here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newAddress, setNewAddress] = useState(address);

  return (
    <>
    <div className="block items-center justify-top my-2 my-2 p-3 ">
      <div className="flex">
        <p>Username: </p>
        {edittingTitle ? (
          <>
        <ClickAwayListener
          onClickAway={() => {
            if (variant === "edit") {
              setEdittingTitle(false);
            }
          }}
        >
          <Input
            autoFocus
            defaultValue={title}
            onChange={(e) => setNewTitle(e.target.value)}
            className="grow mx-2"
            placeholder="Enter your username"
          />
        </ClickAwayListener>
        <Pencil className="mx-1 " size={10} />
        </>
      ) : (
        <button
          onClick={() => setEdittingTitle(true)}
          className="mx-2 w-40 flex"
        >
          <Typography className="text-start">{newTitle}</Typography>
          <Pencil className="mx-1 " size={10} />
        </button>

      )}
      </div>
      <div className="flex">
        <p>User email: </p>

        {edittingDescription ? (
          <>
        <ClickAwayListener
          onClickAway={() => {
            if (variant === "edit") {
              setEdittingDescription(false);
            }
          }}
        >
          <Input
            autoFocus
            defaultValue={description}
            placeholder="Enter your email"
            className="grow mx-2"
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </ClickAwayListener>
        <Pencil className="mx-1 " size={10} />
        </>
      ) : (
        <button
          onClick={() => setEdittingDescription(true)}
          className="mx-2 w-50 flex"
        >
          <Typography className="text-start">{newDescription}</Typography>
          <Pencil className="mx-1 " size={10} />
        </button>
      )}
      

      </div>

      <div className="flex">
        <p>Address: </p>
        {edittingAddress ? (
          <>
          <ClickAwayListener
          onClickAway={() => {
            if (variant === "edit") {
              setEdittingAddress(false);
            }
          }}
        >
          <Input
            autoFocus
            defaultValue={address}
            onChange={(e) => setNewAddress(e.target.value)}
            className="grow mx-2"
            placeholder="Enter your address"
          />
          
        </ClickAwayListener>
          <Pencil className="mx-1 " size={10} />
          </>
        
      ) : (
        <button
          onClick={() => setEdittingAddress(true)}
          className="mx-2 w-40 flex"
        >
          <Typography className="text-start">{newAddress}</Typography>
          <Pencil className="mx-1 " size={10} />
        </button>
      )}
      </div>
    

      


    </div>

      

    </>
    

  );
}
