import React from 'react'
import ThemeButton from '../../general/ThemeButton'

const Description = () => {
  return (
    <div className="description">
      <div className="front_page_text_div">
        <h2 className="front_page_header_1">
          Vegaaninen ostoslista helposti ja nopeasti
        </h2>
        <p className="front_page_header_2">
          <strong>GoShopVege</strong>
          luo sinulle valmiin ostoslistan tietystä kaupasta tietylle aikavälille
        </p>
      </div>
      <div className="front_page_button_div">
        <ThemeButton
          onClick={() => console.log('aloitettu! :D')}
          text="Aloita"
          mode="main"
        />
      </div>
    </div>
  )
}

export default Description
