const fs = require('fs')
const path = require('path')

const { dsvFormat } = require('d3-dsv')

const infodemicsDirPath = path.join(__dirname, '../public/assets/infodemics_iso3')

const outFileName = 'last_infodemics_per_country.csv'
const outFilePath = path.join(__dirname, '../public/assets/files', outFileName)

const destOutDirPath = path.join(__dirname, '../dist/assets/files')
const destOutFilePath = path.join(destOutDirPath, outFileName)

const fnInFormat = dsvFormat(';')
const fnOutFormat = dsvFormat(',')

const out = []

fs.readdirSync(infodemicsDirPath)
  .filter(fileName => fileName.endsWith('.csv'))
  .forEach(fileName => {
    const filePath = path.join(infodemicsDirPath, fileName)
    const content = fs.readFileSync(filePath, { encoding: 'utf8' })
    const rows = fnInFormat.parse(content)
    const row = rows[rows.length - 1]

    const ADM0_A3 = path.basename(filePath, '.csv').replace('infodemics_', '')

    const date = row.date
    const num_bot = +row.TWI_num_unvbot + +row.TWI_num_verbot
    const num_hum = +row.TWI_num_unvhum + +row.TWI_num_verhum
    const pct_num_bot = (num_bot + num_hum) ? +(num_bot / (num_bot + num_hum)).toFixed(3) : null

    const num_unrel_fact = +row.FAC_num_unreliable
    const num_rel_fact = +row.FAC_num_reliable
    const pct_unrel_fact = (num_unrel_fact + num_rel_fact) ? +(num_unrel_fact / (num_unrel_fact + num_rel_fact)).toFixed(3) : null

    const fol_unrel_exp = +row.FAC_fol_unreliable
    const fol_rel_exp = +row.FAC_fol_reliable
    const risk_index = (fol_unrel_exp + fol_rel_exp) ? +(fol_unrel_exp / (fol_unrel_exp + fol_rel_exp)).toFixed(3) : null

    const sentiment = +(+row.EMO_Sentiment).toFixed(3)

    out.push({
      ADM0_A3,
      date,
      num_bot,
      num_hum,
      pct_num_bot,
      num_unrel_fact,
      num_rel_fact,
      pct_unrel_fact,
      fol_unrel_exp,
      fol_rel_exp,
      risk_index,
      sentiment
    })
  })

// write on public folder
const content = fnOutFormat.format(out)
fs.writeFileSync(outFilePath, content)

// try to write on dest folder too
if (fs.existsSync(destOutDirPath)) {
  fs.writeFileSync(destOutFilePath, content)
}
