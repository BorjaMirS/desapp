import React from 'react'
import estils from './DespesesLlista.module.css'

export default function DespesesLlista({ despeses, handleClick }) {
    return (
        <div>
            {
                despeses.map((despesa, index) => (
                    //Ja que hem importat React a la primera línea per emprar fragment, es pot emprar React.Fragment o només Fragment (forma de no haver de crear un component div per incloure la property key per React)
                    <div className={estils.targeta} key={despesa.id}>
                        <h2>{index + 1} - {despesa.concepte} </h2>
                        <button onClick={() => handleClick(despesa.id)}>Eliminar despesa</button>
                    </div>
                )
                )
            }
        </div>
    )
}
