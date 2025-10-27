import React, { useState } from "react";
import styles from './sass/styles.css'
import { MenuMobile } from "../MenuMobile";

interface HeaderMobileProps {
    iconeMenu?: string;
    logoMenu?: string;
}

const IconeMenu = ({ iconeMenu }: { iconeMenu?: string }) => {
    if (iconeMenu) {
        return <img src={iconeMenu} alt="Menu" width="14" height="14" />
    }

    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 6.41663H0V7.58329H14V6.41663Z" fill="#1D1D1D" />
            <path d="M14 2.33337H0V3.50004H14V2.33337Z" fill="#1D1D1D" />
            <path d="M14 10.5H0V11.6667H14V10.5Z" fill="#1D1D1D" />
        </svg>
    )
}

export const HeaderMobile = ({ iconeMenu, logoMenu }: HeaderMobileProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleOpen = () => {
        setIsMenuOpen(true)
        console.log("aberto")
    }

    const handleClose = () => {
        setIsMenuOpen(false)
        console.log("fechado")
    }

    return (
        <div className={styles.containerBtnMenu}>

            <button className={styles.menuButton} onClick={handleOpen}>
                <IconeMenu iconeMenu={iconeMenu} />
            </button>

            <MenuMobile
                logo={logoMenu}
                onClose={handleClose}
                isOpen={isMenuOpen}
            />
        </div>
    )
}

HeaderMobile.schema = {
    title: "Header Mobile",
    type: "object",
    properties: {
        iconeMenu: {
            title: "Ícone do Botão Menu",
            description: "Upload de um ícone personalizado para o botão hamburguer",
            type: "string",
            widget: {
                "ui:widget": "image-uploader"
            }
        },
        logoMenu: {
            title: "Logo do Menu",
            description: "Logo que aparece dentro do menu lateral quando aberto",
            type: "string",
            widget: {
                "ui:widget": "image-uploader"
            }
        }
    }
}