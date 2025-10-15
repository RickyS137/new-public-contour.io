import HeroBlock from '../../components/Hero/Hero'
import cls from './MainPage.module.css'
import point1 from 'assets/point1.png'
import point2 from 'assets/point2.png'
import point3 from 'assets/point3.png'
import point4 from 'assets/point4.png'
import NewsItem from 'components/cards/NewsItem'
import { useEffect } from 'react'
import { frappe } from 'shared/frappeService'
import useNewsStore from 'store/news.store'

const MainPage = () => {
    const { latestNews, setLatestNews } = useNewsStore();

    useEffect(() => {
        frappe.getList('Cat News', {
            fields: ["f_s_title", "f_s_content", "f_dt_pubdate", "name"],
            limit_page_length: 10,
        }).then((data) => {
            setLatestNews(data);
        })
    },[setLatestNews])    

  return (
    <div className={cls.mainPage}>
        <div className={cls.heroBlock}>
            <div className={cls.customContainer}>
                <div className={cls.heroBlockInner}>
                    <div className={cls.heroL}>
                        <p>Государственная информационная система в области обеспечения биологической безопасности (ГИС ББ) формируется в соответствии с федеральным законом от 30 декабря 2020 года № 492 «О биологической безопасности в Российской Федерации» в целях управления биологическими рисками и обеспечения обмена информацией между заинтересованными органами власти при осуществлении их взаимодействия в области обеспечения биологической безопасности.</p>
                    </div>
                    <div className={cls.artBlock}>
                        <HeroBlock/>
                    </div>
                </div>
            </div>
        </div>
        <div className={cls.projectTarget}>
            <div className={cls.customContainer}>
                <div className={cls.projectTargetInner}>
                    <div className={cls.titleBlock}>
                        <h2 className={cls.projectTargetTitle}>О системе</h2>
                    </div>
                    <hr/>
                    <div className={cls.projectTargetDescription}>
                        <span>В соответствии с Указом Президента Российской Федерации от 11 марта 2019 года № 97 «Об Основах государственной политики Российской Федерации в области обеспечения химической и биологической безопасности на период до 2025 года и дальнейшую перспективу» к приоритетным направлениям государственной политики в области обеспечения биологической безопасности относятся:</span>
                        <br/>
                        <br/>
                        <div className={cls.descriptionPoint}>
                            <span><img src={point1} alt="point" /></span><span>Мониторинг биологических рисков.</span>
                        </div>
                        <br/>
                        <div className={cls.descriptionPoint}>
                            <span><img src={point2} alt="point" /></span> <span>Совершенствование нормативно-правового регулирования и государственного управления.</span>
                        </div>
                        <br/>
                        <div className={cls.descriptionPoint}>
                            <span><img src={point3} alt="point" /></span> <span>Развитие ресурсного обеспечения национальной системы биологической безопасности.</span>
                        </div>
                        <br/>
                        <div className={cls.descriptionPoint}>
                            <span><img src={point4} alt="point" /></span> <span>Осуществление комплекса мероприятий по нейтрализации биологических угроз, предупреждению и минимизации биологических рисков, повышению защищенности населения и окружающей среды от негативного воздействия опасных биологических факторов, а также оценка эффективности указанных мероприятий.</span>
                        </div>
                        <br/>
                        <br/>
                        <span>Указом Президента Российской Федерации от 2 июля 2021 года № 400 «О Стратегии национальной безопасности Российской Федерации» установлено, что развитие системы мониторинга биологических рисков для предупреждения биологических угроз и реагирования на них является одной из задач по достижению целей государственной политики в сфере сбережения народа России и развития человеческого потенциала.</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={cls.newsBlock}>
            <div className={cls.customContainer}>
                <div className={cls.newsBlockInner}>
                    <div className={cls.newsBlockTitle}>
                        <h2 className={cls.newsTitle}>Последние новости</h2>
                    </div>
                    <hr/>
                    <div className={cls.news}>
                        {latestNews.length && latestNews.map((item, index) => {
                            return (
                                <NewsItem key={index} item={item} />
                            )
                        })}
                    </div>
                    <div className={cls.newsButtonBlock}>
                        <a href="/open-news"><button className={cls.goToNewsButton}>Все новости</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainPage