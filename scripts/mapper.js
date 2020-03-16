const fs = require('fs')
const path = require('path')

const { dsvFormat } = require('d3-dsv')

const geojsonPath = path.join(__dirname, '../src/assets/map/world')
const infodemicsDirPath = path.join(__dirname, '../public/assets/infodemics_iso3')

const outDirPath = path.join(__dirname, '../public/assets/mapDicts')
const destOutDirPath = path.join(__dirname, '../dist/assets/mapDicts')

const fnFormat = dsvFormat(';')

const world = require(geojsonPath)

const outs = {
  confirmed: {},
  bots: {},
  unreliable: {},
  riskIndex: {},
  negSentiment: {}
}

world.features
  .concat([{ properties: { ADM0_A3: '_WORLD' } }])
  .forEach(f => {
    const ADM0_A3 = f.properties.ADM0_A3
    const filePath = path.join(infodemicsDirPath, `infodemics_${ADM0_A3}.csv`)

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, { encoding: 'utf8' })
      const rows = fnFormat.parse(content)

      outs.confirmed[ADM0_A3] = rows.map(row =>
        row.EPI_confirmed_cum.length
          ? +row.EPI_confirmed_cum : null
      )

      outs.bots[ADM0_A3] = rows.map(row => {
        const sumBots = +row.TWI_num_verbot + +row.TWI_num_unvbot
        const sumTot = sumBots + +row.TWI_num_unvhum + +row.TWI_num_verhum
        if (!sumTot) return null
        return +(sumBots / sumTot).toFixed(4) || null
      })

      outs.unreliable[ADM0_A3] = rows.map(row => {
        const sumUnreliable = +row.FAC_num_unreliable
        const sumTot = sumUnreliable + +row.FAC_num_reliable
        if (!sumTot) return null
        return +(sumUnreliable / sumTot).toFixed(4) || null
      })

      outs.riskIndex[ADM0_A3] = rows.map(row => {
        const sumExpUnreliable = +row.FAC_fol_unreliable
        const sumTot = sumExpUnreliable + +row.FAC_fol_reliable
        if (!sumTot) return null
        return +(sumExpUnreliable / sumTot).toFixed(4) || null
      })

      outs.negSentiment[ADM0_A3] = rows.map(row =>
        row.EMO_Sentiment.length
          ? +row.EMO_Sentiment >= 0
            ? 0
            : -(+(+row.EMO_Sentiment).toFixed(4))
          : null
      )
    } else {
      outs.confirmed[ADM0_A3] = null
      outs.bots[ADM0_A3] = null
      outs.unreliable[ADM0_A3] = null
      outs.riskIndex[ADM0_A3] = null
      outs.negSentiment[ADM0_A3] = null
    }
  })

Object.keys(outs).forEach(k => {
  const fileName = `${k}.json`
  const filePath = path.join(outDirPath, fileName)

  // write on public folder
  const content = JSON.stringify(outs[k])
  fs.writeFileSync(filePath, content)

  // try to write on dest folder too
  if (fs.existsSync(destOutDirPath)) {
    const destFilePath = path.join(destOutDirPath, fileName)
    fs.writeFileSync(destFilePath, content)
  }
})
