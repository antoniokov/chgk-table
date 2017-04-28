# Экспорт расплюсовок турниров по ЧГК

Выгружает турниры за последние `N` дней с сайта рейтинга 
и делает для каждого [csv-файл](https://replaytable.com/assets/csv/chgk/4109.csv) с расплюсовкой.

Такую расплюсовку принимает, например, [Replay Table](https://replaytable.com/examples/chgk/2015-2016).

В `export.js` есть две функции: 
* `exportTournament(tournamentId)` для выгрузки конкретного турнира
* `exportTournaments()` для выгрузки пачки турниров


### Опции `config.js`

| Параметр | Смысл | По умолчанию |
|----------|-------|--------------|
| `tournamentId` | ID турнира для экспорта. Если не указан, выгружаются все турниры за период  | `null` |
| `latestDaysToUpdate` | Интервал, за который берутся турниры | `30` |
| `tournamentTypes` | Виды турниров | `['Обычный']` |
| `directory` | Папка, куда складываются файлы | `./csv` |
| `isForced` | Перезаписывать ли уже имеющиеся файлы | `true` |
| `timeout` | Сколько милисекунд выжидать между запросами за турнирами. Сайт рейтинга плохо реагирует на несколько запросов в секунду | `1000` |


### Использование

Для запуска нужен Node.js 7+ и NPM.

Установка и запуск с конфигурацией по умолчанию:
```
git clone https://github.com/antoniokov/chgk-table.git
cd chgk-table
npm install
nodejs export.js
```

После этого у вас появится папка `csv` с результатами всех очных турниров за последний месяц.
