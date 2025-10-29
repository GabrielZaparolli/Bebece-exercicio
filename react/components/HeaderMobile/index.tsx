import React, { useState } from "react"
import styles from './sass/styles.css'
import { MenuMobile } from "../MenuMobile"

// ============= INTERFACES =============
interface SubCategory {
    __editorItemTitle: string
    url: string
}

interface Category {
    __editorItemTitle: string
    categoryUrl: string
    subCategories: SubCategory[]
    color?: string
}

interface HeaderMobileProps {
    iconeMenu?: string
    logoMenu?: string
    bannerMenuMobile?: string
    categories?: Category[]
}

// ============= COMPONENTE =============
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

export const HeaderMobile = ({ iconeMenu, logoMenu, categories = [], bannerMenuMobile }: HeaderMobileProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleOpen = () => {
        setIsMenuOpen(true)
        console.log("Menu aberto")
    }

    const handleClose = () => {
        setIsMenuOpen(false)
        console.log("Menu fechado")
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
                categories={categories}
                bannerMenuMobile= {bannerMenuMobile}
            />
        </div>
    )
}

// ============= SCHEMA PARA SITE EDITOR =============
HeaderMobile.schema = {
    title: "Header Mobile",
    description: "Cabeçalho mobile com menu de categorias",
    type: "object",
    properties: {
        iconeMenu: {
            title: "Ícone do Botão Menu",
            description: "Upload de um ícone personalizado para o botão hamburguer (deixe vazio para usar o padrão)",
            type: "string",
            widget: {
                "ui:widget": "image-uploader"
            }
        },
        logoMenu: {
            title: "Logo do Menu",
            description: "Logo que aparece dentro do menu mobile aberto (deixe vazio para usar a logo padrão)",
            type: "string",
            widget: {
                "ui:widget": "image-uploader"
            }
        },
        bannerMenuMobile: {
            title: "Banner do Menu Mobile",
            description: "Banner que aparece dentro do menu mobile aberto (deixe vazio para usar o padrão)",
            type: "string",
            widget: {
                "ui:widget": "image-uploader"
            }
        },
        categories: {
            title: "Categorias do Menu",
            description: "Configure as categorias e subcategorias que aparecerão no menu mobile",
            type: "array",
            minItems: 0,
            maxItems: 20,
            items: {
                title: "Categoria",
                type: "object",
                properties: {
                    __editorItemTitle: {
                        title: "Nome da Categoria",
                        description: "Nome que aparecerá no menu (ex: Roupas, Calçados, Outlet)",
                        type: "string",
                        default: ""
                    },
                    categoryUrl: {
                        title: "URL da Categoria",
                        description: "Link da categoria (ex: /roupas, /outlet). Se tiver subcategorias, este link é opcional",
                        type: "string",
                        default: ""
                    },
                    color: {
                        title: "Cor do Texto (Opcional)",
                        description: "Cor personalizada em hexadecimal (ex: #FF0000 para vermelho, #00FF00 para verde). Deixe vazio para usar a cor padrão preta",
                        type: "string",
                        default: ""
                    },
                    subCategories: {
                        title: "Subcategorias",
                        description: "Adicione subcategorias que aparecerão quando expandir a categoria principal. Deixe vazio para categoria sem subcategorias",
                        type: "array",
                        minItems: 0,
                        maxItems: 30,
                        items: {
                            title: "Subcategoria",
                            type: "object",
                            properties: {
                                __editorItemTitle: {
                                    title: "Nome da Subcategoria",
                                    description: "Nome que aparecerá no submenu (ex: Camisetas, Tênis)",
                                    type: "string",
                                    default: ""
                                },
                                url: {
                                    title: "URL da Subcategoria",
                                    description: "Link da subcategoria (ex: /roupas/camisetas)",
                                    type: "string",
                                    default: ""
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}