
"use client";
import { useState } from "react";

const projects = [
  {v:"bateau",l:"Réparation bateau"},
  {v:"surf",l:"Réparation surf"},
  {v:"moulage",l:"Moulage pièce"},
  {v:"carrosserie",l:"Peinture carrosserie"},
  {v:"bois",l:"Bois / Terrasse"},
  {v:"piscine",l:"Stratification piscine"}
];

export default function Home(){

const [step,setStep]=useState(0);
const [answers,setAnswers]=useState({});
const [status,setStatus]=useState("");

function set(k,v){setAnswers({...answers,[k]:v});setStep(step+1);}

function calcPiscine(){
  const L=+answers.L||0,W=+answers.W||0,H=+answers.H||0;
  return (L*W)+(2*L*H)+(2*W*H);
}

function estimate(){
  const s=answers.surface||calcPiscine()||1;
  return Math.round(s*12);
}

async function submit(e){
 e.preventDefault();
 const data=new URLSearchParams({
   "form-name":"diagnostic-quai-west",
   ...answers,
   prix:estimate()
 });
 await fetch("/forms.html",{method:"POST",body:data});
 setStatus("Envoyé");
}

return (
<div style={{padding:30}}>

<div style={{marginBottom:10,fontWeight:"bold"}}>
{Object.values(answers).join(" → ")}
</div>

{step===0 && projects.map(p=>(
<button key={p.v} onClick={()=>set("project",p.v)}>{p.l}</button>
))}

{step===1 && (
<>
<button onClick={()=>set("level","Débutant")}>Débutant</button>
<button onClick={()=>set("level","Pro")}>Pro</button>
</>
)}

{step===2 && answers.project==="moulage" && (
<>
<input placeholder="Longueur" onChange={e=>set("L",e.target.value)}/>
<input placeholder="Largeur" onChange={e=>set("W",e.target.value)}/>
<input placeholder="Hauteur" onChange={e=>set("H",e.target.value)}/>
<button onClick={()=>setStep(6)}>Calcul</button>
</>
)}

{step===2 && answers.project!=="moulage" && (
<>
<input placeholder="Surface m2" onChange={e=>set("surface",e.target.value)}/>
<button onClick={()=>setStep(6)}>Calcul</button>
</>
)}

{step===6 && (
<>
<h2>Résultat</h2>
<p>Surface : {answers.surface || calcPiscine()} m²</p>
<p>Prix estimé : {estimate()} €</p>

{answers.project==="moulage" && (answers.L*answers.W*answers.H<5000) && (
<p>👉 Conseil : utiliser silicone RTV</p>
)}

<form onSubmit={submit}>
<input name="prenom" placeholder="Prénom"/>
<input name="email" placeholder="Email"/>
<button type="submit">Envoyer</button>
</form>

<p>{status}</p>
</>
)}

</div>
);
}
