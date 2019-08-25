import Taro, { Component, Config, useState } from "@tarojs/taro"
import { View, Text, Input } from "@tarojs/components"
import "./index.scss"
import NavBar from "../../components/navbar/index"
import { AtCheckbox, AtIndexes, AtSearchBar } from "taro-ui"
import LANGUAGE_LIST from "./languages"
import FabButton from "../../components/fab-button"
import { LanguageParams } from "../trending"
import { setGlobalData, getGlobalData } from "../../utils/global_data"

interface OptionsLang {
  value: string
  label: string
}

const MyLanguages = () => {
  const myLangs = getGlobalData("myLangs")
  const initSelectedList = myLangs.map(lang => lang.language)

  const [optionsLangs, setOptionsLangs] = useState<OptionsLang[]>(LANGUAGE_LIST)
  const [selectedList, setSelectedList] = useState<string[]>(initSelectedList)
  const [fiterVal, setFilterVal] = useState<string>("")

  const handleSeletedChange = val => {
    setSelectedList(val)
  }

  const handleChangeInput = e => {
    const val = e.target.value
    setFilterVal(val)

    const _langs = LANGUAGE_LIST.filter(_lang => _lang.value.includes(val))
    setOptionsLangs(_langs)
  }

  const handleFabClick = () => {
    const languages = LANGUAGE_LIST.reduce<LanguageParams[]>(
      (result, { value, label }) => {
        // TODO 按顺序排
        if (selectedList.includes(value)) {
          result.push({ language: value, title: label })
        }
        return result
      },
      []
    )
    setGlobalData("myLangs", languages)
    Taro.navigateBack()
  }

  return (
    <View>
      <NavBar isGoBackBtn></NavBar>
      <View>
        <View>
          <Input
            autoFocus
            placeholder="Search"
            className="filter-bar"
            value={fiterVal}
            onInput={handleChangeInput}
          ></Input>
        </View>
        <AtCheckbox
          options={optionsLangs}
          selectedList={selectedList}
          onChange={handleSeletedChange}
        ></AtCheckbox>
        <FabButton icon="check" onClick={handleFabClick}></FabButton>
      </View>
    </View>
  )
}

export default MyLanguages
