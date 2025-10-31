export const forms = {
  news: {
    title: 'Добавление новости',
    fields: [
      { name: 'f_s_title', label: 'Заголовок', type: 'input', required: true },
      { name: 'f_dt_pubdate', label: 'Опубликовано', type: 'date', required: false },
      { name: 'f_s_content', label: 'Описание', type: 'textarea', required: false },
    ]
  },
  document: {
    title: 'Добавление документа',
    fields: [
      { name: 'f_opt_kind', label: 'Тип', type: 'select', doctype: 'Cat NPA Document', required: true },
      { name: 'f_opt_author', label: 'Автор документа', type: 'select', doctype: 'Cat NPA Document', required: false },
      { name: 'f_s_title', label: 'Наименование', type: 'textarea', doctype: 'Cat NPA Document', required: true },
      { name: 'f_s_description', label: 'Описание', type: 'textarea', doctype: 'Cat NPA Document', required: false },
      { name: 'f_s_num', label: 'Номер документа', type: 'input', doctype: 'Cat NPA Document', required: false },
      { name: 'f_dt_effective_date', label: 'Дата вступления в силу', type: 'date', doctype: 'Cat NPA Document', required: false },
      { name: 'f_s_source', label: 'Источник', type: 'input', doctype: 'Cat NPA Document', required: false },
      { name: 'f_dt_date', label: 'Дата публикации', type: 'date', doctype: 'Cat NPA Document', required: true },
      { name: 'f_a_doc', label: 'Документ', type: 'file', doctype: 'Cat NPA Document', required: false },
      { name: 'f_dt_recent_date', label: 'Дата последних изменений', type: 'date', doctype: 'Cat NPA Document', required: false },
      { name: 'f_opt_status', label: 'Статус', type: 'select', doctype: 'Cat NPA Document', required: false },
      { name: 'f_a_pdf', label: 'Скан/PDF', type: 'file', doctype: 'Cat NPA Document', required: false },
    ]
  },
  microflora: {
    title: 'Создание коллекции представителей нормальной микрофлоры',
    fields: [
      { name: 'name', label: 'Имя', type: 'input', required: true, doctype: 'Cat Microflora', },
      { name: 'f_s_number', label: '№ п/п', type: 'input', required: true, doctype: 'Cat Microflora', },
      { name: 'f_s_in_book', label: 'Внесено в справочник', type: 'select', required: false, options: ['Да', 'Нет'], doctype: 'Cat Microflora', },
      { name: 'f_s_kind', label: 'Род', type: 'input', required: true, doctype: 'Cat Microflora', },
      { name: 'f_s_view', label: 'Вид', type: 'input', required: true, doctype: 'Cat Microflora', },
      { name: 'f_s_name', label: 'Наименование (номер)', type: 'input', required: true, doctype: 'Cat Microflora', },
      { name: 'f_s_culture_type', label: 'Тип культуры', type: 'input', required: true, doctype: 'Cat Microflora', },
      { name: 'f_s_culture_props', label: 'Культурально-морфологические свойства', type: 'select', required: true, doctype: 'Cat Microflora', },
      { name: 'f_s_enzyme_activity', label: 'Профиль ферментативной активности', type: 'select', required: true, options: ['Да', 'Нет'], doctype: 'Cat Microflora', },
      { name: 'f_s_antigenic_structure', label: 'Антигенная структура', type: 'select', required: true, options: ['Да', 'Нет'], doctype: 'Cat Microflora', },
      { name: 'f_s_stability_profile', label: 'Профиль а/м устойчивости', type: 'select', required: true, options: ['Да', 'Нет'], doctype: 'Cat Microflora', },
      { name: 'f_s_specific_activity', label: 'Специфическая активность', type: 'select', required: true, options: ['Да', 'Нет'], doctype: 'Cat Microflora', },
      { name: 'f_s_other', label: 'Иное (указать)', type: 'textarea', required: true, doctype: 'Cat Microflora', },
      { name: 'f_s_16s_rrna', label: '16S pPHK', type: 'select', required: true, options: ['Да', 'Нет'], doctype: 'Cat Microflora', },
      { name: 'f_s_sequencing', label: 'Секвенирование', type: 'select', required: true, options: ['Да', 'Нет'], doctype: 'Cat Microflora', },
      { name: 'f_s_organization', label: 'Организация', type: 'input', required: true, doctype: 'Cat Microflora', },
      { name: 'f_s_object_of_symbiosis', label: 'Обьект симбиоза', type: 'input', required: true, doctype: 'Cat Microflora', },
      { name: 'f_s_note', label: 'Примечание', type: 'textarea', required: false, doctype: 'Cat Microflora', },
    ]
  }
}