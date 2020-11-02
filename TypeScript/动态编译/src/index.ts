/*
 * @Author: your name
 * @Date: 2020-11-01 13:12:15
 * @LastEditTime: 2020-11-02 08:50:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /VScode/ts/src/index.ts
 */

import SuperAgent from 'superagent'
import Cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

interface TYPERESULT {
  [time: number]: {
    [index: number]: {
      dec: string,
      img: string
    }
  }
}

class Crowller {
  private url = 'http://www.dell-lee.com'

  constructor() {
    this.Spider()
  }
  async Spider() {
    const json = await this.getHTML()
    this.generateJSONFile(json)
    console.info(json)
  }
  async getHTML() {
    const html = await SuperAgent.get(this.url)
    const json = this.getTarget(html.text)
    return json
  }
  getTarget(html: string) {
    const $ = Cheerio.load(html)
    const items = $('.course-item')
    const date = new Date().getTime()
    const result: TYPERESULT = {
      [date]: {}
    }
    items.map((index, element) => {
      const dec = $(element).find('.course-desc').eq(0).text()
      const img = this.url + $(element).find('.course-img').eq(0).attr('src') || ''
      result[date][index] = { dec, img }
    })
    return result
  }
  generateJSONFile(json: TYPERESULT) {
    const filePath = path.resolve(__dirname, '../data/data.json')
    const isExist = fs.existsSync(filePath)
    let content: TYPERESULT = {}
    if (isExist) {
      const haveExistedContent = fs.readFileSync(filePath, 'utf-8')
      content = JSON.parse(haveExistedContent)
    }
    const time = parseInt(Object.keys(json)[0], 10)
    content[time] = json[time]
    fs.writeFileSync(filePath, JSON.stringify(content))
  }
}

const crowller = new Crowller()