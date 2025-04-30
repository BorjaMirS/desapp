import ReactDOM from 'react-dom'
import './Modal.css'

//amb l'snippet rfc i tabulador ja ens crea la base d'un component
export default function Modal({children, handleTancar, esVorera}) {
    //Create portal té l'element al primer paràmetre de la funció i el lloc on el volem pintar en aquest cas el body de l'html que és el segon paràmetre. Alerta perquè els estils es perden quan es mou a una altra banda
  return ReactDOM.createPortal((
    <div className="modal-fons">
        <div className="modal" style={
            {
                border: "4px solid",
                borderColor: esVorera ? "#ff4500" : "#555",
                textAlign: "center"
            }
        }>
            {children}
            <button onClick={handleTancar} className={esVorera ? "boto-vorera" : ""}>Tancar</button>
        </div>
    </div>
  ), document.body)
}
