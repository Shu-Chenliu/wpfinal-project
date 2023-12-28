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
  status?: string;
};

type EditCardDialogProps = {
  variant: "edit";
  status: string; 
  title?: string; //user name
  description?: string; 
  address?:string;
  marketName?: string;
  marketAddress?:string;
  marketDescription?: string;
  marketMessage?: string;
  
  
  
};

type CardDialogProps = NewCardDialogProps | EditCardDialogProps;

export default function EditProfile(props: CardDialogProps) {
  const { variant, status} = props;
  const title = variant === "edit" ? props.title : "";
  const description = variant === "edit" ? props.description : "";
  const address = variant === "edit" ? props.address : "";
  const marketName = variant === "edit" ? props.marketName : "";
  const marketAddress = variant === "edit" ? props.marketAddress : "";
  const marketDescription = variant === "edit" ? props.marketDescription : "";
  const marketMessage = variant === "edit" ? props.marketMessage : "";


  const [edittingTitle, setEdittingTitle] = useState(variant === "new");
  const [edittingDescription, setEdittingDescription] = useState(variant === "new");
  const [edittingAddress, setEdittingAddress] = useState(variant === "new");
  const [edittingMarketName, setEdittingMarketName] = useState(variant === "new");
  const [edittingMarketAddress, setEdittingMarketAddress] = useState(variant === "new");
  const [edittingMarketDescription, setEdittingMarketDescription] = useState(variant === "new");
  const [edittingMarketMessage, setEdittingMarketMessage] = useState(variant === "new");

  // using a state variable to store the value of the input, and update it on change is another way to get the value of a input
  // however, this method is not recommended for large forms, as it will cause a re-render on every change
  // you can read more about it here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newAddress, setNewAddress] = useState(address);
  const [newMarketName, setNewMarketName] = useState(marketName);
  const [newMarketAddress, setNewMarketAddress] = useState(marketAddress);
  const [newMarketDescription, setNewMarketDescription] = useState(marketDescription);
  const [newMarketMessage, setNewMarketMessage] = useState(marketMessage);


  return (
    <>
    {status === "personal" ? (
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
          <ClickAwayListener onClickAway={() => { if (variant === "edit") {setEdittingAddress(false);}}} >
          <Input
            autoFocus
            defaultValue={address}
            onChange={(e) => setNewAddress(e.target.value)}
            className="grow mx-2"
            placeholder="Enter your address"
          /> 
        </ClickAwayListener> <Pencil className="mx-1 " size={10} />
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

    ) : (
      <>
      <div className="block items-center justify-top my-2 my-2 p-3 ">
      <div className="flex">
        <p>Market Name: </p>
        {edittingMarketName ? (
          <>
        <ClickAwayListener
          onClickAway={() => {
            if (variant === "edit") {
              setEdittingMarketName(false);
            }
          }}
        >
          <Input
            autoFocus
            defaultValue={marketName}
            onChange={(e) => setNewMarketName(e.target.value)}
            className="grow mx-2"
            placeholder="Enter market name"
          />
        </ClickAwayListener>
        <Pencil className="mx-1 " size={10} />
        </>
      ) : (
        <button
          onClick={() => setEdittingMarketName(true)}
          className="mx-2 w-40 flex"
        >
          <Typography className="text-start">{newMarketName}</Typography>
          <Pencil className="mx-1 " size={10} />
        </button>

      )}
      </div>
      <div className="flex">
        <p>Market description: </p>
        {edittingMarketDescription ? (
          <>
        <ClickAwayListener
          onClickAway={() => {
            if (variant === "edit") {
              setEdittingMarketDescription(false);
            }
          }}
        >
          <textarea
            autoFocus
            defaultValue={marketDescription}
            placeholder="Enter market description"
            className="grow mx-2 w-full"
            onChange={(e) => setNewMarketDescription(e.target.value)}
          />
        </ClickAwayListener>
        <Pencil className="mx-1 " size={10} />
        </>
      ) : (
        <button
          onClick={() => setEdittingMarketDescription(true)}
          className="mx-2 w-50 flex"
        >
          <Typography className="text-start">{newMarketDescription}</Typography>
          <Pencil className="mx-1 " size={10} />
        </button>
      )}
      

      </div>

      <div className="flex">
        <p>Market address: </p>
        {edittingMarketAddress ? (
          <>
          <ClickAwayListener onClickAway={() => { if (variant === "edit") {setEdittingMarketAddress(false);}}} >
          <Input
            autoFocus
            defaultValue={marketAddress}
            onChange={(e) => setNewMarketAddress(e.target.value)}
            className="grow mx-2"
            placeholder="Enter market address"
          /> 
        </ClickAwayListener> <Pencil className="mx-1 " size={10} />
          </>
      ) : (
        <button
          onClick={() => setEdittingMarketAddress(true)}
          className="mx-2 w-40 flex"
        >
          <Typography className="text-start">{newMarketAddress}</Typography>
          <Pencil className="mx-1 " size={10} />
        </button>
      )}
      </div>
      <div className="flex">
        <p>Market message: </p>
        {edittingMarketMessage ? (
          <>
          <ClickAwayListener onClickAway={() => { if (variant === "edit") {setEdittingMarketMessage(false);}}} >
          <Input
            autoFocus
            defaultValue={marketMessage}
            onChange={(e) => setNewMarketMessage(e.target.value)}
            className="grow mx-2"
            placeholder="Enter market message"
          /> 
        </ClickAwayListener> <Pencil className="mx-1 " size={10} />
          </>
      ) : (
        <button
          onClick={() => setEdittingMarketMessage(true)}
          className="mx-2 w-40 flex"
        >
          <Typography className="text-start">{newMarketMessage}</Typography>
          <Pencil className="mx-1 " size={10} />
        </button>
      )}
      </div>




    </div>
      
      </>

    )}

    

      

    </>
    

  );
}