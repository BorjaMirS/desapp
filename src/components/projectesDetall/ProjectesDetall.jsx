import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OnGetDocument } from '../../firebase/firebase';

export default function ProjectesDetall() {
    const { id } = useParams();
    const [projecte, setProjecte] = useState(null);
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
        const unsubscribe = OnGetDocument(id, "projectes", (proj) => {
            console.log("Projecte abans: ",proj.data());
            if (proj.exists()) {
                setProjecte(proj.data());
                console.log("Projecte després: ", proj.data());
                console.log("Aquest es un projecte", projecte);
            } else {
                setProjecte(null);
            }
        })
        return () => unsubscribe()
    }, [])

    if (!projecte) {
        return <p>Projecte no trobat</p>    
    }
    
  return (
    <div>
        <h2>
            Detall del projecte
        </h2>
        <p><strong> Nom: </strong>{projecte.nom}</p>
        <p><strong> ID Propietari: </strong>{projecte.idpropietari}</p>
        <p><strong> Nom Propietari: </strong>{projecte.nompropietari}</p>
    </div>
    
  )
}
