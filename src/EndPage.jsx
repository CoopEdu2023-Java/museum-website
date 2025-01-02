import './App.css'
import artifactCover from './assets/image 22.svg'
import translation from './assets/language-icon-language-translation-vector.jpg'
import background from './assets/MAMA_Background_with_Curves.svg'
import more from './assets/more.svg'
import next from './assets/next.svg'
import { useTranslation } from "react-i18next";
import "./i18n.jsx";
import useToggleLanguage from "./useToggleLanguage.js";


function EndPage() {
    const { toggleLanguage } = useToggleLanguage();
    const { t } = useTranslation();
    return (
      <div className="EndPage" style={{backgroundImage: `url(${background})`}}>
          <h1 className={'titleChinese'}>{t('title')}</h1>
          <h1 className={'titleEnglish'}>This is the end of the section</h1>
          <h1 className={'sectionName'}>{t('sectionName')}</h1>
          <div className={'artifactTitleContainer'}>
              <h2 className={'artifactTitle'}>荀子与《性恶论》</h2>
          </div>
          <div className={'artifact-container'}>
              <img src={artifactCover} className={'artifactCover'}></img>
          </div>
          <button className={'button'}>
              <img className={'more'} src={more}></img>
          </button>
          <button className={'button'}>
              <img src={next} className={'next'}></img>
          </button>
          <button className={'translate'} onClick={toggleLanguage}>
              <img src={translation} className={'translationImage'}></img>
          </button>
      </div>
  )
}

export default EndPage
