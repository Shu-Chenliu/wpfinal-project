import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ImpossibleDialogProps={
  open: boolean,
  onClose: ()=>void,

}
export default function ImpossibleDialog({open,onClose}:ImpossibleDialogProps){
  return(
    <Dialog open={open}>
      <DialogContent
        className="flex flex-col gap-4 w-3/4 bg-red-500"
        style={{ width: "500px" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">{"Impossible :)"}</DialogTitle>
          
        </DialogHeader>
        

        <div className="flex w-full justify-end ">
        <Button
          className="font-semibold text-slate-100 bg-slate-700 hover:bg-slate-600 mx-2"
          onClick={async() => {onClose(); }} 
        >
          Close
        </Button>
        
        </div>      
      </DialogContent>
    </Dialog>
  );
}