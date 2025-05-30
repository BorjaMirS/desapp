import React from 'react'
import estils from './ProjectesLlista.module.css'

export default function ProjectesLlista({projectes, eliminarProjecte}) {
  return (
        <div>
            {
                projectes.map((projecte, index) => (
                    //Ja que hem importat React a la primera línea per emprar fragment, es pot emprar React.Fragment o només Fragment (forma de no haver de crear un component div per incloure la property key per React)
                    <div className={estils.targeta} key={despesa.id}>
                        <Link to={`/projectes/${projecte.id}`}>
                            <h2>{index + 1} - {projecte.nom} </h2>
                        </Link>
                        <button onClick={() => eliminarProjecte(projecte.id)}>Eliminar projecte</button>
                    </div>
                )
                )
            }
        </div>  )
}
