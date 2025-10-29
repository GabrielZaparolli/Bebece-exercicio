import React, { useEffect, useState } from "react"
import styles from './sass/styles.css'

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

interface MenuHeaderProps {
    logo?: string
    bannerMenuMobile?: string
    onClose: () => void
}

interface MenuMobileProps {
    logo?: string
    bannerMenuMobile?: string
    onClose: () => void
    isOpen: boolean
    categories: Category[]
}

interface CategoryItemProps {
    category: Category
}

interface MenuItensProps {
    logo?: string
    bannerMenuMobile?: string
    onClose: () => void
    categories: Category[]
}

// ============= COMPONENTES =============

const LogoSvg = () => {
    return (
        <svg width="102" height="24" viewBox="0 0 102 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_1822)">
                <path d="M101.185 20.3307C101.01 20.2137 100.776 20.2722 100.674 20.4622C99.6361 22.3623 97.8675 23.0346 96.289 23.0346C92.7227 23.0346 90.8226 19.4976 90.618 15.3174C90.6034 15.0982 90.6034 14.8789 90.6034 14.6597V14.6451H100.835C100.981 14.6451 101.098 14.5282 101.098 14.382C101.171 11.985 100.089 7.41028 94.7981 7.41028C90.1795 7.41028 86.2188 10.845 86.2188 15.6536C86.2188 20.5499 90.3257 23.9992 94.5643 23.9992C97.2244 23.9992 100.075 22.6546 101.375 20.4476L101.185 20.3307ZM93.9943 7.81952C96.0843 8.28723 96.7859 11.8681 96.6836 14.2505H90.6034C90.6765 10.465 92.1088 7.81952 93.9943 7.81952Z" fill="#1D1D1D" />
                <path d="M67.9355 20.4622C66.8978 22.3623 65.1293 23.0346 63.5508 23.0346C59.9845 23.0346 58.0845 19.4976 57.8798 15.3174C57.8652 15.0982 57.8652 14.8789 57.8652 14.6597V14.6451H68.0963C68.2425 14.6451 68.3594 14.5282 68.3594 14.382C68.4325 11.985 67.3509 7.41028 62.06 7.41028C57.4414 7.41028 53.4805 10.845 53.4805 15.6536C53.4805 20.5499 57.5875 23.9992 61.8261 23.9992C64.4862 23.9992 67.3363 22.6546 68.6371 20.4476L68.4763 20.3307C68.2863 20.2137 68.0378 20.2722 67.9355 20.4622ZM61.2561 7.81952C63.3462 8.28723 64.0477 11.8681 63.9454 14.2505H57.8652C57.9529 10.465 59.3853 7.81952 61.2561 7.81952Z" fill="#1D1D1D" />
                <path d="M35.6621 0.00012207V19.483C35.6621 21.9823 37.6791 23.9993 40.1784 23.9993V4.51641C40.1784 2.03172 38.1614 0.00012207 35.6621 0.00012207Z" fill="#1D1D1D" />
                <path d="M42.9407 7.14709C42.7069 7.14709 42.5169 7.32248 42.5169 7.55634C42.4876 7.55634 42.5023 7.55634 42.5169 7.55634C45.2939 8.24328 46.887 12.1311 46.5362 16.9543C46.2731 20.5936 45.0746 23.2537 42.5169 23.5899C42.5169 23.8237 42.7069 24.0138 42.9554 23.9991C43.9931 23.9553 45.0162 23.7214 45.9662 23.3122C49.9856 21.5729 52.3972 16.7497 50.4094 12.1895C48.9917 8.94484 45.9954 7.2494 42.9407 7.14709Z" fill="#1D1D1D" />
                <path d="M0 0.00012207V19.483C0 21.9823 2.01699 23.9993 4.51629 23.9993V4.51641C4.51629 2.03172 2.49931 0.00012207 0 0.00012207Z" fill="#1D1D1D" />
                <path d="M7.27863 7.14709C7.04477 7.14709 6.85477 7.32248 6.85477 7.55634C6.82554 7.55634 6.84015 7.55634 6.85477 7.55634C9.63178 8.24328 11.2249 12.1311 10.8741 16.9543C10.611 20.5936 9.41254 23.2537 6.85477 23.5899C6.85477 23.8237 7.04477 24.0138 7.29324 23.9991C8.33097 23.9553 9.35408 23.7214 10.3041 23.3122C14.3235 21.5729 16.7351 16.7497 14.7473 12.1895C13.3296 8.94484 10.3333 7.2494 7.27863 7.14709Z" fill="#1D1D1D" />
                <path d="M32.2578 20.4622C31.2201 22.3623 29.4516 23.0346 27.873 23.0346C24.3068 23.0346 22.4067 19.4976 22.2021 15.3174C22.1875 15.0982 22.1875 14.8789 22.1875 14.6597V14.6451H32.4186C32.5647 14.6451 32.6817 14.5282 32.6817 14.382C32.7547 11.985 31.6732 7.41028 26.3822 7.41028C21.7636 7.41028 17.8027 10.845 17.8027 15.6536C17.8027 20.5499 21.9098 23.9992 26.1484 23.9992C28.8085 23.9992 31.6585 22.6546 32.9594 20.4476L32.7986 20.3307C32.594 20.2137 32.3601 20.2722 32.2578 20.4622ZM25.5784 7.81952C27.6684 8.28723 28.37 11.8681 28.2677 14.2505H22.1875C22.2606 10.465 23.6929 7.81952 25.5784 7.81952Z" fill="#1D1D1D" />
                <path d="M84.6406 20.5063C83.6029 22.3918 81.8344 23.0495 80.2412 23.0495C76.4996 23.0495 74.5703 19.1325 74.5703 14.3969C74.5703 11.4299 75.3303 9.07679 76.9527 8.19984C76.9527 7.90752 76.675 7.68828 76.3827 7.76136C72.831 8.71139 70.1855 11.7368 70.1855 15.6685C70.1855 20.5063 74.2487 23.9995 78.5312 23.9995C81.1913 23.9995 84.0414 22.6549 85.3422 20.4479L85.2252 20.3602C85.0206 20.2286 84.7575 20.2871 84.6406 20.5063Z" fill="#1D1D1D" />
                <path d="M78.6032 7.98029C79.9625 8.85724 81.9502 10.8304 83.2072 12.2043L84.4203 8.7257C83.0756 8.02414 80.854 7.41028 78.8809 7.41028H78.764C78.5886 7.41028 78.457 7.55643 78.457 7.71721C78.457 7.83414 78.5155 7.92183 78.6032 7.98029Z" fill="#1D1D1D" />
                <path d="M93.7763 2.30955L98.0003 5.15964L98.1757 5.0281L93.864 0.0587158H93.6886L89.377 5.0281L89.5523 5.15964L93.7763 2.30955Z" fill="#1D1D1D" />
            </g>
            <defs>
                <clipPath id="clip0_1_1822">
                    <rect width="102" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

const bannerMenuMobileDefault = '../../../assets/images/bannerPrincipal1.jpg'

const MenuHeader = ({ logo, onClose, bannerMenuMobile }: MenuHeaderProps) => {
    return (
        <div className={styles.headerMenuMobile}>
            <div className={styles.logoMenuMobile}>
                {logo ? (
                    <img src={logo} alt="Logo" />
                ) : (
                    <LogoSvg />
                )}

                <button className={styles.closeButton} onClick={onClose}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0.471333L7.52867 0L4 3.52867L0.471333 0L0 0.471333L3.52867 4L0 7.52867L0.471333 8L4 4.47133L7.52867 8L8 7.52867L4.47133 4L8 0.471333Z" fill="#1D1D1D" />
                    </svg>
                </button>
            </div>

            <div className={styles.bannerMenuMobile}>
                <img className={styles.imagemBannerMenu} src={!bannerMenuMobile ? bannerMenuMobileDefault : bannerMenuMobile} alt="" />
                <div className={styles.contentBannerMenu}>
                    <p>Celebration - 20 Anos</p>
                    <a>Conheça</a>
                </div>
            </div>
        </div>
    )
}

const CategoryItem = ({ category }: CategoryItemProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const hasSubCategories = category.subCategories && category.subCategories.length > 0

    const toggleCategory = () => {
        if (hasSubCategories) {
            setIsOpen(!isOpen)
        }
    }

    return (
        <div className={styles.categoryItem}>
            <div className={styles.categoryHeader} onClick={toggleCategory}>
                <a
                    href={category.categoryUrl}
                    className={styles.categoryLink}
                    style={{ color: category.color || undefined }}
                    onClick={(e) => {
                        if (hasSubCategories) {
                            e.preventDefault()
                        }
                    }}
                >
                    {category.__editorItemTitle}
                </a>
                {hasSubCategories && (
                    <button className={`${styles.toggleButton} ${isOpen ? styles.open : ''}`}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_7_3570)">
                                <path d="M2.47067 7.99995L2 7.52928L5.29367 4.23562C5.35616 4.17311 5.39126 4.08834 5.39126 3.99995C5.39126 3.91156 5.35616 3.82679 5.29367 3.76428L2.00567 0.476949L2.477 0.00561523L5.76433 3.29295C5.9518 3.48048 6.05712 3.73478 6.05712 3.99995C6.05712 4.26511 5.9518 4.51942 5.76433 4.70695L2.47067 7.99995Z" fill="#1D1D1B" />
                            </g>
                            <defs>
                                <clipPath id="clip0_7_3570">
                                    <rect width="8" height="8" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                )}
            </div>

            {hasSubCategories && (
                <div className={`${styles.subCategoriesContainer} ${isOpen ? styles.open : ''}`}>
                    {category.subCategories.map((subCategory, index) => (
                        <a
                            key={index}
                            href={subCategory.url}
                            className={styles.subCategoryLink}
                        >
                            {subCategory.__editorItemTitle}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}

const MenuItens = ({ logo, onClose, categories, bannerMenuMobile }: MenuItensProps) => {
    return (
        <div className={styles.menuItensContainer}>
            <MenuHeader logo={logo} onClose={onClose} bannerMenuMobile={bannerMenuMobile} />

            <div className={styles.categoriesMenu}>
                {categories && categories.length > 0 ? (
                    categories.map((category, index) => (
                        <CategoryItem key={index} category={category} />
                    ))
                ) : (
                    <p className={styles.noCategories}>Nenhuma categoria cadastrada</p>
                )}
            </div>
        </div>
    )
}

export const MenuMobile = ({ logo, onClose, isOpen, categories = [], bannerMenuMobile }: MenuMobileProps) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        
        <div className={`${styles.menuMobileContainer} ${isOpen ? styles.menuOpen : ''}`}>

           
            <MenuItens
                logo={logo}
                onClose={onClose}
                categories={categories}
                bannerMenuMobile={bannerMenuMobile}

            />
        </div>
    )
}