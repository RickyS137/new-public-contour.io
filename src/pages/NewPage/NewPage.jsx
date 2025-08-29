import { useState } from 'react'
import cls from './NewPage.module.css'
import FieldInput from 'components/FieldInput/FieldInput'

const NewPage = () => {
  const [post, setPost] = useState({
    title: "О циркулирующих вариантах SARS-CoV-2 в Российской Федерации",
    content: "По данным ФГБУ «НИИ гриппа им. А.А. Смородинцева» Минздрава России на 15 неделе 2025 г. (07.04.25 - 13.04.25) уровень заболеваемости населения гриппом и другими ОРВИ понизился по сравнению с предыдущей неделей на 10,1% и составил 63,0 на 10 000 населения, был ниже базовой линии (89,9) на 29,9% и ниже еженедельного эпидемического порога на 35,0% На 15 неделе по результатам ПЦР анализа клинических материалов от 12851 больного новый коронавирус SARS-CoV-2 был выявлен в 40 (0,3%) случаях. По результатам мониторинга генетической изменчивости возбудителя COVID-19 в первом квартале 2025 года в Российской Федерации доминирующей линией был вариант JN.1.16 и его производные (69,4% от всех исследованных образцов); 16,7% приходилось на линию LF.7 и ее производные. По данным ВОЗ (последнее обновление - февраль 2025 г.) наибольший интерес представляют следующие линии, получившие статус варианта под наблюдением (VUM): KP.2, KP.3, KP.3.1.1, JN.1.18, LB.1, XEC, LP.8.1. Все эти линии начали циркулировать в мире в 2024 г. Частота встречаемости линий VUM в Российской Федерации за первые три месяца 2025 года не превышала ни для какого из вариантов 6,5%. Доля линии KP.2 составляла 1,8% в январе и 2,2 % в марте 2025 г. Доля линии XEC была 3,3% - в январе и 2,1% - в марте. Доли линий KP.3, KP.3.1.1 и JN.1.18 составляли менее 1% от общего числа секвенированных геномов SARS-CoV-2 из Российской Федерации. Отмечается рост частоты встречаемости линии LP.8.1 среди российских изолятов вируса: с 1% - в феврале до 6,5% в марте 2025 г. По данным ВОЗ LP.8.1 в настоящее время является одним из двух вариантов линий VUM с растущей распространенностью во всем мире (второй – XEC). Учитывая имеющиеся данные, дополнительный риск для здоровья населения, связанный с LP.8.1, оценивается как низкий на глобальном уровне. Ожидается, что рекомендуемые вакцины от COVID-19 сохранят перекрестную реакцию с этим вариантом при симптоматическом и тяжелом течении заболевания, поскольку иммунный ответ на LP.8.1 сопоставим с XEC, который, как было показано, имеет ограниченный иммунный ответ на мРНК-бустерные вакцины JN.1 или KP.2. Таким образом, не предполагается, что дальнейшее распространение этого варианта увеличит нагрузку на национальные системы общественного здравоохранения по сравнению с другими подвидами Омикрона. Источник: https://www.influenza.spb.ru/surveillance/flu-bulletin// https://www.who.int/publications/m/item/risk-evaluation-for-sars-cov-2-variant-under-monitoring-lp81",
    pubdate: "2025-08-25"
  })

  const [draftPost, setDraftPost] = useState(post)
  const [isEdit, setIsEdit] = useState(false)

  const handleChange = (field) => (val) => {
    setDraftPost(prev => ({ ...prev, [field]: val }))
  }

  const handleEdit = () => {
    setDraftPost(post)
    setIsEdit(true)
  }

  const handleCancel = () => {
    setDraftPost(post)
    setIsEdit(false)
  }

  const handleSave = () => {
    setPost(draftPost)
    setIsEdit(false)
  }

  return (
    <div className={cls.pageWrapper}>
      <div className={cls.postInfo}>
        <h4 className={cls.postTitle}>
          <FieldInput
            isEdit={isEdit}
            type="input"
            value={draftPost.title}
            onChange={handleChange('title')}
          />
        </h4>

        <div className={cls.postContent}>
          <FieldInput
            isEdit={isEdit}
            type="textarea"
            value={draftPost.content}
            onChange={handleChange('content')}
          />
        </div>

        <span className={cls.postPubdate}>
          <b>Дата публикации: </b>
          <FieldInput
            isEdit={isEdit}
            type="input"
            value={draftPost.pubdate}
            onChange={handleChange('pubdate')}
          />
        </span>
      </div>

      <div className={cls.postControlPanel}>
        <button className={cls.blueBtn}>Вернуться</button>
        <div className={cls.adminControls}>
          {isEdit ? (
            <>
              <button className={cls.blueBtn} onClick={handleCancel}>Отмена</button>
              <button className={cls.blueBtn} onClick={handleSave}>Сохранить</button>
            </>
          ) : (
            <button className={cls.blueBtn} onClick={handleEdit}>Редактировать</button>
          )}
          <button className={cls.redBtn}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default NewPage
