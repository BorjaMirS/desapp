import React from 'react'
import { Link } from 'react-router-dom'
import estils from './DespesesLlista.module.css'

export default function DespesesLlista({ despeses, eliminarDespesa }) {
    return (
        <div>
            {
                despeses.map((despesa, index) => (
                    //Ja que hem importat React a la primera línea per emprar fragment, es pot emprar React.Fragment o només Fragment (forma de no haver de crear un component div per incloure la property key per React)
                    <div className={estils.targeta} key={despesa.id}>
                        <Link to={`/despesa/${despesa.id}`}>
                            <h2>{index + 1} - {despesa.concepte} </h2>
                        </Link>
                        <button onClick={() => eliminarDespesa(despesa.id)}>Eliminar despesa</button>
                    </div>
                )
                )
            }
        </div>
    )
}
