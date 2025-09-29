export const forms = {
  news: {
    title: 'Добавление новости',
    fields: [
      { name: 'title', label: 'Заголовок', type: 'input', required: false },
      { name: 'content', label: 'Опубликовано', type: 'date', required: false },
      { name: 'Описание', label: 'Описание', type: 'textarea', required: false },
    ]
  },
  document: {
    title: 'Добавление документа',
    fields: [
      { name: 'type', label: 'Тип', type: 'input', required: false },
      { name: 'author', label: 'Автор документа', type: 'input', required: false },
      { name: 'name', label: 'Наименование', type: 'input', required: false },
      { name: 'description', label: 'Описание', type: 'textarea', required: false },
      { name: 'number', label: 'Номер документа', type: 'input', required: false },
      { name: 'effectiveDate', label: 'Дата вступления в силу', type: 'date', required: false },
      { name: 'source', label: 'Источник', type: 'input', required: false },
      { name: 'publishDate', label: 'Дата публикации', type: 'date', required: false },
      { name: 'documentFile', label: 'Документ', type: 'file', required: false },
      { name: 'lastChangeDate', label: 'Дата последних изменений', type: 'date', required: false },
      { name: 'status', label: 'Статус', type: 'input', required: false },
      { name: 'scan', label: 'Скан', type: 'file', required: false },
    ]
  },
  microflora: {
    title: 'Создание коллекции представителей нормальной микрофлоры',
    fields: [
      { name: 'number', label: '№ п/п', type: 'input', required: false },
      { name: 'addedToDirectory', label: 'Внесено в справочник', type: 'input', required: false },
      { name: 'genus', label: 'Род', type: 'input', required: false },
      { name: 'species', label: 'Вид', type: 'input', required: false },
      { name: 'nameOrNumber', label: 'Наименование (номер)', type: 'input', required: false },
      { name: 'cultureType', label: 'Тип культуры', type: 'input', required: false },
      { name: 'culturalMorphologicalProperties', label: 'Культурально-морфологические свойства', type: 'textarea', required: false },
      { name: 'fermentativeActivityProfile', label: 'Профиль ферментативной активности', type: 'textarea', required: false },
      { name: 'antigenStructure', label: 'Антигенная структура', type: 'textarea', required: false },
      { name: 'antimicrobialResistanceProfile', label: 'Профиль а/м устойчивости', type: 'textarea', required: false },
      { name: 'specificActivity', label: 'Специфическая активность', type: 'textarea', required: false },
      { name: 'other', label: 'Иное (указать)', type: 'textarea', required: false },
      { name: '16SrRNA', label: '16S pPHK', type: 'input', required: false },
      { name: 'sequencing', label: 'Секвенирование', type: 'input', required: false },
      { name: 'organization', label: 'Организация', type: 'input', required: false },
      { name: 'symbiosisObject', label: 'Обьект симбиоза', type: 'input', required: false },
      { name: 'note', label: 'Примечание', type: 'textarea', required: false },
    ]
  }
}