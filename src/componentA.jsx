import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ComponentA = () => {
    const { t, i18n } = useTranslation('ComponentA', { useSuspense: false });
    // 封装，翻译文件弄成参数。
    useEffect(() => {
        i18n.addResourceBundle('en', 'ComponentA', require('./locales/en/ComponentA.json'), true);
        i18n.addResourceBundle('zh', 'ComponentA', require('./locales/zh/ComponentA.json'), true);
    }, [i18n]);

    return (
        <div>
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
        </div>
    );
};

export default ComponentA;
