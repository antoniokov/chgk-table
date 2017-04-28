# Экспорт расплюсовок турниров по ЧГК

Выгружает турниры за последние `N` дней с сайта рейтинга 
и делает для каждого [csv-файл](htttps://replaytable.com/assets/csv/chgk/4109.csv) с расплюсовкой.

Такую расплюсовку принимает, например, [Replay Table](https://replaytable.com/examples/chgk/2015-2016).

В `export.js` есть две функции: 
* `exportTournament(tournamentId)` для выгрузки конкретного турнира
* `exportTournaments()` для выгрузки пачки турниров

### Опции `config.js`

| Параметр | Смысл | По умолчанию |
|----------|-------|--------------|
| `directory` | директория, куда складываются файлы | `./csv` |
| `latestDaysToUpdate` | интервал, за который берутся турниры | 30 |

Для запуска нужен Node.js 7+ и NPM.

Установка и запуск с конфигурацией по умолчанию:
```
git clone https://github.com/antoniokov/chgk-table.git
cd chgk-table
npm install
nodejs export.js
```
