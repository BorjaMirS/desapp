import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OnGetDocument } from '../../firebase/firebase';

export default function ProjectesDetall() {
    const { id } = useParams();
    const [projecte, setProjecte] = useState(null);
    
    useEffect(() => {
        const unsubscribe = OnGetDocument(id, "projectes", (proj) => {
            console.log("Projecte abans: ",proj);
            if (proj.exists()) {
                setProjecte({...proj.data(),id: proj.id });
                console.log("Projecte després: ", proj);
            } else {
                setProjecte(null);
            }
        })
        return () => unsubscribe()
    }, [id])

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
    </div>
    
  )
}
