import React from "react";
import styles from './sass/styles.css'
import { useProduct } from 'vtex.product-context'

export const BotaoProjetoPDP = () => {
    const productContext = useProduct()

    if (!productContext?.product) {
        return null
    }

    const { skuSpecifications } = productContext.product

    //Identifica a especificação BotaoProjetosPdp
    const botaoProjetosPdp = skuSpecifications?.find(
        (spec: any) => spec.field.name === 'BotaoProjetosPdp'
    )

    const mostrarBotao = botaoProjetosPdp?.values?.[0]?.name === 'sim'

    if (!mostrarBotao) {
        return null
    }

    return (
        <>
            {mostrarBotao &&
                <button className={styles.botaoProjetosPdpstyles}>Quero um projeto exclusivo com esse modelo de cozinha</button>
            }
        </>
    )
}