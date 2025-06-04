
import Titol from '../../components/titol/Titol'

export default function inici() {

      const titol = "Benvinguts a l'app de despeses!!"

      const subtitol = "Registra't, crea els teus projectes, afegeix participants i comença a enregistrar despeses!!"


  return (
    <div>
            <Titol titol={titol} subtitol={subtitol}/>
    </div>
  )
}
