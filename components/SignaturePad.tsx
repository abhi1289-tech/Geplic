"use client";

import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

export default function SignaturePad({ onSave }:{ onSave:(data:string)=>void }){

  const sigRef:any = useRef(null);

  function clear(){
    sigRef.current.clear();
  }

  function save(){

    if(sigRef.current.isEmpty()){
      alert("Please draw your signature first");
      return;
    }

    const dataUrl = sigRef.current.toDataURL();

    onSave(dataUrl);

  }

  return(

    <div className="border p-4 rounded bg-white text-black">

      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width:400,
          height:150,
          className:"border"
        }}
      />

      <div className="flex gap-3 mt-3">

        <button
          onClick={clear}
          className="px-3 py-1 border"
        >
          Clear
        </button>

        <button
          onClick={save}
          className="px-3 py-1 bg-black text-white"
        >
          Save Signature
        </button>

      </div>

    </div>

  );

}